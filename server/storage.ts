import { type User, type InsertUser, type Contact, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact methods
  getContacts(): Promise<Contact[]>;
  getContact(id: string): Promise<Contact | undefined>;
  getContactByEmail(email: string): Promise<Contact | undefined>;
  getContactByPhone(phone: string): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContact(id: string, contact: Partial<InsertContact>): Promise<Contact | undefined>;
  deleteContact(id: string): Promise<boolean>;
  getContactsStats(): Promise<{
    total: number;
    thisMonth: number;
    thisWeek: number;
    today: number;
  }>;
  getRecentContacts(limit?: number): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    
    // Create default admin user
    const adminId = randomUUID();
    this.users.set(adminId, {
      id: adminId,
      username: "admin",
      password: "$2b$10$31MNlUAGVpCst/BNW9zL0OVzSoMVBCasbrhTd14XtI3uC/vnni1km", // "kerventz2025"
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getContact(id: string): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async getContactByEmail(email: string): Promise<Contact | undefined> {
    return Array.from(this.contacts.values()).find(
      (contact) => contact.email && contact.email.toLowerCase() === email.toLowerCase()
    );
  }

  async getContactByPhone(phone: string): Promise<Contact | undefined> {
    return Array.from(this.contacts.values()).find(
      (contact) => contact.phone === phone
    );
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const now = new Date();
    
    // Add K.B.S🚀🔥 suffix if not already present
    const nameWithSuffix = insertContact.name.includes("K.B.S🚀🔥") 
      ? insertContact.name 
      : `${insertContact.name} K.B.S🚀🔥`;

    const contact: Contact = {
      ...insertContact,
      id,
      name: nameWithSuffix,
      createdAt: now,
      updatedAt: now,
    };
    
    this.contacts.set(id, contact);
    return contact;
  }

  async updateContact(id: string, updateData: Partial<InsertContact>): Promise<Contact | undefined> {
    const contact = this.contacts.get(id);
    if (!contact) return undefined;

    const updatedContact: Contact = {
      ...contact,
      ...updateData,
      updatedAt: new Date(),
    };

    this.contacts.set(id, updatedContact);
    return updatedContact;
  }

  async deleteContact(id: string): Promise<boolean> {
    return this.contacts.delete(id);
  }

  async getContactsStats(): Promise<{
    total: number;
    thisMonth: number;
    thisWeek: number;
    today: number;
  }> {
    const contacts = Array.from(this.contacts.values());
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return {
      total: contacts.length,
      today: contacts.filter(c => new Date(c.createdAt) >= today).length,
      thisWeek: contacts.filter(c => new Date(c.createdAt) >= thisWeek).length,
      thisMonth: contacts.filter(c => new Date(c.createdAt) >= thisMonth).length,
    };
  }

  async getRecentContacts(limit: number = 5): Promise<Contact[]> {
    const contacts = Array.from(this.contacts.values());
    return contacts
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
