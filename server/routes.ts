import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "kerventz-status-secret-2025";

// Middleware to verify JWT token
const verifyToken = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: "Token requis" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalide" });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Identifiants invalides" });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: "Identifiants invalides" });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.json({ token, user: { id: user.id, username: user.username } });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.post("/api/auth/verify", verifyToken, (req, res) => {
    res.json({ valid: true, user: req.user });
  });

  // Public contact routes
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      
      // Check for existing email only if email is provided
      if (validatedData.email) {
        const existingEmail = await storage.getContactByEmail(validatedData.email);
        if (existingEmail) {
          return res.status(400).json({ 
            message: "Un contact avec cet email existe déjà",
            field: "email"
          });
        }
      }

      // Check for existing phone
      const existingPhone = await storage.getContactByPhone(validatedData.phone);
      if (existingPhone) {
        return res.status(400).json({ 
          message: "Un contact avec ce numéro existe déjà",
          field: "phone"
        });
      }

      const contact = await storage.createContact(validatedData);
      res.status(201).json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Données invalides",
          errors: error.errors
        });
      }
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Protected admin routes
  app.get("/api/admin/contacts", verifyToken, async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.get("/api/admin/contacts/stats", verifyToken, async (req, res) => {
    try {
      const stats = await storage.getContactsStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.get("/api/admin/contacts/:id", verifyToken, async (req, res) => {
    try {
      const contact = await storage.getContact(req.params.id);
      if (!contact) {
        return res.status(404).json({ message: "Contact introuvable" });
      }
      res.json(contact);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.put("/api/admin/contacts/:id", verifyToken, async (req, res) => {
    try {
      const validatedData = insertContactSchema.partial().parse(req.body);
      const contact = await storage.updateContact(req.params.id, validatedData);
      
      if (!contact) {
        return res.status(404).json({ message: "Contact introuvable" });
      }
      
      res.json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Données invalides",
          errors: error.errors
        });
      }
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.delete("/api/admin/contacts/:id", verifyToken, async (req, res) => {
    try {
      const deleted = await storage.deleteContact(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Contact introuvable" });
      }
      res.json({ message: "Contact supprimé avec succès" });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  // Export routes
  app.get("/api/admin/export/csv", verifyToken, async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      
      const csvHeader = "Nom,Email,Téléphone,Pays,Date de création\n";
      const csvRows = contacts.map(contact => 
        `"${contact.name}","${contact.email || ''}","${contact.phone}","${contact.country}","${new Date(contact.createdAt).toLocaleDateString('fr-FR')}"`
      ).join('\n');
      
      const csv = csvHeader + csvRows;
      
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="contacts-kerventz-status.csv"');
      res.send('\ufeff' + csv); // UTF-8 BOM for proper encoding
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de l'export CSV" });
    }
  });

  app.get("/api/admin/export/vcf", verifyToken, async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      
      const vcfContent = contacts.map(contact => {
        const vcardLines = [
          'BEGIN:VCARD',
          'VERSION:3.0',
          `FN:${contact.name}`,
          `TEL:${contact.countryCode}${contact.phone}`,
        ];
        
        if (contact.email) {
          vcardLines.splice(3, 0, `EMAIL:${contact.email}`);
        }
        
        vcardLines.push('END:VCARD', '');
        return vcardLines.join('\n');
      }).join('\n');
      
      res.setHeader('Content-Type', 'text/vcard; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="contacts-kerventz-status.vcf"');
      res.send('\ufeff' + vcfContent); // UTF-8 BOM for proper encoding
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de l'export VCF" });
    }
  });

  // Get recent contacts for public site
  app.get("/api/contacts/recent", async (req, res) => {
    try {
      const recentContacts = await storage.getRecentContacts(5);
      
      // Only return safe public data
      const publicData = recentContacts.map(contact => ({
        name: contact.name,
        country: contact.country,
        createdAt: contact.createdAt
      }));
      
      res.json(publicData);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des contacts récents" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
