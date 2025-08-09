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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, User, Mail, Phone, Flag, MessageSquare, Check } from "lucide-react";

export function ContactForm() {
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
    const message = `Bonjour KERVENTZ STATUS 🚀🔥 Je viens de m'inscrire. Mon nom: ${successData.name}, Email: ${successData.email}`;
    return `https://wa.me/+50937911616?text=${encodeURIComponent(message)}`;
  };

  if (showSuccess) {
    return (
      <section id="contact-form" className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <CardContent className="p-8">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                    {t('success')}
                  </h3>
                  <p className="text-green-700 dark:text-green-300 mb-4">
                    {t('successMessage')}
                  </p>
                  <div className="flex gap-3">
                    <Button 
                      asChild
                      className="bg-green-500 hover:bg-green-600 text-white transform hover:scale-105"
                    >
                      <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-whatsapp mr-2 text-lg"></i>
                        {t('whatsappContact')}
                      </a>
                    </Button>
                    <Button 
                      onClick={() => setShowSuccess(false)}
                      variant="outline"
                      className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      ← Retour au formulaire
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="contact-form" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('contact')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('contactDescription')}
          </p>
        </div>

        <Card className="shadow-2xl border border-gray-200 dark:border-gray-700">
          <CardContent className="p-8 md:p-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                          <User className="w-4 h-4 mr-2" />
                          {t('name')}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Votre nom complet"
                            className="h-12"
                            {...field}
                          />
                        </FormControl>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          *Le suffixe "K.B.S🚀🔥" sera automatiquement ajouté
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                          <Mail className="w-4 h-4 mr-2" />
                          {t('email')} (Optionnel)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="votre@email.com"
                            className="h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                          <Flag className="w-4 h-4 mr-2" />
                          {t('country')}
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {COUNTRIES.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                {country.name} ({country.dialCode})
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
                        <FormLabel className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                          <Phone className="w-4 h-4 mr-2" />
                          {t('phone')}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Votre numéro"
                            className="h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>



                <Button 
                  type="submit" 
                  disabled={createContactMutation.isPending}
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-4 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {createContactMutation.isPending ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Enregistrement...
                    </div>
                  ) : (
                    <>
                      <Rocket className="w-5 h-5 mr-2" />
                      {t('register')}
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
