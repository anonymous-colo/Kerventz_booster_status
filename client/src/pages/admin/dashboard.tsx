import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  Users, 
  Download, 
  FileText, 
  Search, 
  Edit, 
  Trash2, 
  LogOut, 
  BarChart3,
  Calendar,
  Mail,
  Phone,
  Globe,
  TrendingUp,
  UserCircle,
  Shield,
  Activity,
  Clock,
  Zap
} from "lucide-react";
import { ProfessionalLoader } from "@/components/ProfessionalLoader";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ProfessionalStatsCard } from "@/components/ProfessionalStatsCard";
import type { Contact } from "@shared/schema";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      setLocation("/admin/login");
      return;
    }

    // Verify token
    const verifyToken = async () => {
      try {
        const response = await apiRequest("POST", "/api/auth/verify", {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) {
          throw new Error('Token invalid');
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");
        setLocation("/admin/login");
      }
    };

    verifyToken();
  }, [setLocation]);

  // Fetch contacts
  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ["/api/admin/contacts"],
    queryFn: async () => {
      const token = localStorage.getItem("admin_token");
      const response = await apiRequest("GET", "/api/admin/contacts", undefined, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.json();
    },
    enabled: !!localStorage.getItem("admin_token"),
  });

  // Fetch stats
  const { data: stats } = useQuery({
    queryKey: ["/api/admin/contacts/stats"],
    queryFn: async () => {
      const token = localStorage.getItem("admin_token");
      const response = await apiRequest("GET", "/api/admin/contacts/stats", undefined, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.json();
    },
    enabled: !!localStorage.getItem("admin_token"),
  });

  // Delete contact mutation
  const deleteContactMutation = useMutation({
    mutationFn: async (id: string) => {
      const token = localStorage.getItem("admin_token");
      await apiRequest("DELETE", `/api/admin/contacts/${id}`, undefined, {
        headers: { Authorization: `Bearer ${token}` }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contacts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contacts/stats"] });
      toast({
        title: "Contact supprimé",
        description: "Le contact a été supprimé avec succès",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le contact",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setLocation("/admin/login");
  };

  const handleExport = async (format: 'csv' | 'vcf') => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await apiRequest("GET", `/api/admin/export/${format}`, undefined, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `contacts-kerventz-status.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Export réussi",
        description: `Le fichier ${format.toUpperCase()} a été téléchargé`,
      });
    } catch {
      toast({
        title: "Erreur d'export",
        description: "Impossible d'exporter les contacts",
        variant: "destructive",
      });
    }
  };

  const filteredContacts = contacts.filter((contact: Contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contact.email && contact.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    contact.phone.includes(searchTerm)
  );

  const adminUser = JSON.parse(localStorage.getItem("admin_user") || "{}");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">KERVENTZ STATUS</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Dashboard Administrateur 🚀🔥</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <UserCircle className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {adminUser.username}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="text-gray-600 dark:text-gray-300"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Professional Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ProfessionalStatsCard
            title="Total Contacts"
            value={stats?.total || 0}
            icon={Users}
            description="Base de données complète"
            variant="primary"
          />
          
          <ProfessionalStatsCard
            title="Ce Mois"
            value={stats?.thisMonth || 0}
            icon={Calendar}
            description="Croissance mensuelle"
            variant="secondary"
          />
          
          <ProfessionalStatsCard
            title="Cette Semaine"
            value={stats?.thisWeek || 0}
            icon={Activity}
            description="Performance hebdomadaire"
            variant="accent"
          />
          
          <ProfessionalStatsCard
            title="Aujourd'hui"
            value={stats?.today || 0}
            icon={Zap}
            description="Activité du jour"
            variant="success"
          />
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Gestion des Contacts</CardTitle>
            <CardDescription>
              Gérez vos contacts, exportez les données et visualisez les statistiques
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher par nom, email ou téléphone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleExport('csv')}
                  variant="outline"
                  className="flex items-center"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
                <Button 
                  onClick={() => handleExport('vcf')}
                  variant="outline"
                  className="flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export VCF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contacts Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Contacts ({filteredContacts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <ProfessionalLoader />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Téléphone</TableHead>
                      <TableHead>Pays</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.map((contact: Contact) => (
                      <TableRow key={contact.id}>
                        <TableCell className="font-medium">{contact.name}</TableCell>
                        <TableCell>
                          {contact.email ? (
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 mr-2 text-gray-400" />
                              {contact.email}
                            </div>
                          ) : (
                            <span className="text-gray-400 italic">Non fourni</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                            {contact.countryCode} {contact.phone}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="flex items-center w-fit">
                            <Globe className="w-3 h-3 mr-1" />
                            {contact.country}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(contact.createdAt).toLocaleDateString('fr-FR')}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedContact(contact)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Détails du Contact</DialogTitle>
                                  <DialogDescription>
                                    Informations complètes du contact
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedContact && (
                                  <div className="space-y-4">
                                    <div>
                                      <label className="text-sm font-medium">Nom complet</label>
                                      <p className="text-sm text-gray-600 dark:text-gray-300">{selectedContact.name}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Email</label>
                                      <p className="text-sm text-gray-600 dark:text-gray-300">
                                        {selectedContact.email || 'Non fourni'}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Téléphone</label>
                                      <p className="text-sm text-gray-600 dark:text-gray-300">
                                        {selectedContact.countryCode} {selectedContact.phone}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Pays</label>
                                      <p className="text-sm text-gray-600 dark:text-gray-300">{selectedContact.country}</p>
                                    </div>
                                    {selectedContact.message && (
                                      <div>
                                        <label className="text-sm font-medium">Message</label>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{selectedContact.message}</p>
                                      </div>
                                    )}
                                    <div>
                                      <label className="text-sm font-medium">Date d'inscription</label>
                                      <p className="text-sm text-gray-600 dark:text-gray-300">
                                        {new Date(selectedContact.createdAt).toLocaleString('fr-FR')}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Supprimer le contact</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Êtes-vous sûr de vouloir supprimer ce contact ? Cette action est irréversible.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteContactMutation.mutate(contact.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Supprimer
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredContacts.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    Aucun contact trouvé
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
