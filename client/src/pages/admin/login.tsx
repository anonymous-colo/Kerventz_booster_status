import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, User, Lock, Rocket } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "Nom d'utilisateur requis"),
  password: z.string().min(1, "Mot de passe requis"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      const response = await apiRequest("POST", "/api/auth/login", data);
      return response.json();
    },
    onSuccess: (data) => {
      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_user", JSON.stringify(data.user));
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans le dashboard administrateur",
      });
      setLocation("/admin/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Erreur de connexion",
        description: error.message || "Identifiants invalides",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            KERVENTZ STATUS
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            🚀🔥 Dashboard Administrateur
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Connexion Sécurisée
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Accédez au panneau d'administration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <User className="w-4 h-4 mr-2" />
                        Nom d'utilisateur
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="admin"
                          className="h-12 bg-white/50 dark:bg-gray-700/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <Lock className="w-4 h-4 mr-2" />
                        Mot de passe
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="kerventz2025"
                          className="h-12 bg-white/50 dark:bg-gray-700/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={loginMutation.isPending}
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-3 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {loginMutation.isPending ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Connexion...
                    </div>
                  ) : (
                    <>
                      <Rocket className="w-5 h-5 mr-2" />
                      Se Connecter
                    </>
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-xs text-blue-700 dark:text-blue-300 text-center">
                <Shield className="w-3 h-3 inline mr-1" />
                Accès sécurisé avec authentification JWT • Session 24h
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Button 
            variant="ghost" 
            onClick={() => setLocation("/")}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            ← Retour au site public
          </Button>
        </div>
      </div>
    </div>
  );
}
