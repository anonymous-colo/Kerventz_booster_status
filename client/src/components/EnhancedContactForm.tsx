import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { useTranslation } from "@/lib/i18n";
import { COUNTRIES } from "@/lib/constants";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Flag, Check, Sparkles, Shield, Globe } from "lucide-react";

export function EnhancedContactForm() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState<InsertContact | null>(null);

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      country: "HT",
      countryCode: "+509",
    },
  });

  const createContactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contacts", data);
      return response.json();
    },
    onSuccess: (data) => {
      setSuccessData(data);
      setShowSuccess(true);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/contacts/recent"] });
    },
    onError: (error: any) => {
      const errorMessage = error.message || "Une erreur est survenue";
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    // Find selected country details
    const selectedCountry = COUNTRIES.find(c => c.code === data.country);
    if (selectedCountry) {
      data.countryCode = selectedCountry.dialCode;
      
      // Validate phone number length
      const phoneDigits = data.phone.replace(/\D/g, '');
      if (phoneDigits.length !== selectedCountry.phoneLength) {
        toast({
          title: "Numéro invalide",
          description: `Le numéro pour ${selectedCountry.name} doit avoir ${selectedCountry.phoneLength} chiffres`,
          variant: "destructive",
        });
        return;
      }
    }
    
    createContactMutation.mutate(data);
  };

  const getWhatsAppUrl = () => {
    if (!successData) return "#";
    const message = `Bonjour KERVENTZ STATUS 🚀🔥 Je viens de m'inscrire. Mon nom: ${successData.name}, Email: ${successData.email || 'Non fourni'}`;
    return `https://wa.me/+50937911616?text=${encodeURIComponent(message)}`;
  };

  if (showSuccess) {
    return (
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">
            🎉 Inscription Réussie !
          </CardTitle>
          <p className="text-green-600 dark:text-green-300">
            Bienvenue dans la communauté KERVENTZ STATUS
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
              Vos Informations
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Nom :</span>
                <Badge variant="outline" className="text-primary-600 border-primary-600">
                  {successData?.name}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Email :</span>
                <Badge variant="outline" className="text-blue-600 border-blue-600">
                  {successData?.email || 'Non fourni'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Téléphone :</span>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {successData?.countryCode} {successData?.phone}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl py-3"
              onClick={() => window.open(getWhatsAppUrl(), '_blank')}
            >
              <span className="text-lg mr-2">💬</span>
              Confirmer sur WhatsApp
            </Button>
            <Button 
              variant="outline"
              className="flex-1 border-2 border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl py-3"
              onClick={() => setShowSuccess(false)}
            >
              Nouveau Formulaire
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-2xl bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
          Rejoignez KERVENTZ STATUS
        </CardTitle>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Inscription rapide et sécurisée • Communauté exclusive 🚀🔥
        </p>
        
        <div className="flex justify-center gap-4 mt-4">
          <Badge variant="outline" className="text-xs">
            <Shield className="w-3 h-3 mr-1" />
            Sécurisé
          </Badge>
          <Badge variant="outline" className="text-xs">
            <Globe className="w-3 h-3 mr-1" />
            International
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nom complet *
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input 
                        placeholder="Votre nom complet" 
                        {...field} 
                        className="pl-10 h-12 rounded-xl border-2 focus:border-primary-500 bg-white dark:bg-gray-700"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email (optionnel)
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input 
                        type="email" 
                        placeholder="votre@email.com" 
                        {...field} 
                        className="pl-10 h-12 rounded-xl border-2 focus:border-blue-500 bg-white dark:bg-gray-700"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Pays *
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 rounded-xl border-2 focus:border-green-500 bg-white dark:bg-gray-700">
                          <Flag className="w-4 h-4 mr-2 text-gray-400" />
                          <SelectValue placeholder="Sélectionner un pays" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {COUNTRIES.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Téléphone *
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input 
                          type="tel" 
                          placeholder="12345678" 
                          {...field} 
                          className="pl-10 h-12 rounded-xl border-2 focus:border-green-500 bg-white dark:bg-gray-700"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button 
              type="submit" 
              disabled={createContactMutation.isPending}
              className="w-full h-14 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
            >
              {createContactMutation.isPending ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Inscription en cours...
                </div>
              ) : (
                <div className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Rejoindre KERVENTZ STATUS 🚀🔥
                </div>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}