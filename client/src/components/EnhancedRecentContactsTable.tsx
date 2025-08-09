import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, Globe, Sparkles, Star, Trophy } from "lucide-react";
import { ProfessionalLoader } from "./ProfessionalLoader";

interface RecentContact {
  name: string;
  country: string;
  createdAt: string;
}

export function EnhancedRecentContactsTable() {
  const { data: recentContacts = [], isLoading } = useQuery<RecentContact[]>({
    queryKey: ["/api/contacts/recent"],
  });

  if (isLoading) {
    return (
      <Card className="w-full border-0 shadow-2xl bg-gradient-to-br from-white via-purple-50 to-pink-50 dark:from-gray-800 dark:via-purple-900/20 dark:to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            <Users className="w-6 h-6 mr-2 text-purple-600" />
            Membres Récents K.B.S 🚀🔥
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <ProfessionalLoader size="lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border-0 shadow-2xl bg-gradient-to-br from-white via-purple-50 to-pink-50 dark:from-gray-800 dark:via-purple-900/20 dark:to-pink-900/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            <Users className="w-6 h-6 mr-2 text-purple-600" />
            Membres Récents K.B.S 🚀🔥
          </CardTitle>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <Star className="w-3 h-3 mr-1" />
            Elite
          </Badge>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Découvrez les derniers professionnels qui ont rejoint notre communauté exclusive
        </p>
      </CardHeader>
      <CardContent>
        {recentContacts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-500 dark:text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
              Soyez le premier à rejoindre !
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
              Votre nom apparaîtra ici après votre inscription
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-purple-200 dark:border-purple-800">
                  <TableHead className="text-purple-700 dark:text-purple-300 font-semibold">
                    <div className="flex items-center">
                      <Trophy className="w-4 h-4 mr-2" />
                      Membre
                    </div>
                  </TableHead>
                  <TableHead className="hidden sm:table-cell text-purple-700 dark:text-purple-300 font-semibold">
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2" />
                      Pays
                    </div>
                  </TableHead>
                  <TableHead className="text-purple-700 dark:text-purple-300 font-semibold">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Date
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentContacts.map((contact, index) => (
                  <TableRow key={index} className="hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors duration-200">
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mr-3">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {contact.name}
                          </p>
                          <p className="text-xs text-purple-600 dark:text-purple-400">
                            Membre K.B.S
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge 
                        variant="outline" 
                        className="border-purple-200 text-purple-700 dark:border-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20"
                      >
                        <Globe className="w-3 h-3 mr-1" />
                        {contact.country}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Clock className="w-3 h-3 mr-1 text-purple-500" />
                        <time className="font-medium">
                          {new Date(contact.createdAt).toLocaleDateString('fr-FR')}
                        </time>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}