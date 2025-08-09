
import React from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Building,
  Briefcase,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { verificarEPIsColaborador, epiData as allEpiData } from "@/lib/data";

const ColaboradorCard = ({ colaborador, onOpenDetails, index }) => {
  const verificacao = verificarEPIsColaborador(colaborador.id, colaborador.epiAssignados, allEpiData);

  const getEPIsColaborador = (colab) => {
    return colab.epiAssignados.map(epiId => 
      allEpiData.find(epi => epi.id === epiId)
    ).filter(Boolean);
  };

  return (
    <motion.div
      key={colaborador.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:border-primary/50">
        <div className={`h-2 ${verificacao.status ? "bg-gradient-to-r from-green-400 to-green-600" : "bg-gradient-to-r from-red-400 to-red-600"}`} />
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-semibold text-primary">{colaborador.nome}</CardTitle>
            <Badge variant={verificacao.status ? "success" : "destructive"} className="gap-1 text-xs">
              {verificacao.status ? (
                <>
                  <CheckCircle className="h-3 w-3" />
                  <span>EPIs OK</span>
                </>
              ) : (
                <>
                  <XCircle className="h-3 w-3" />
                  <span>EPIs Pendentes</span>
                </>
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14 border-2 border-primary/20">
                <AvatarImage src={colaborador.fotoUrl || ""} alt={colaborador.nome} />
                <AvatarFallback className="bg-gradient-to-br from-primary/80 to-secondary/80 text-xl font-semibold text-primary-foreground">
                  {colaborador.nome.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{colaborador.cargo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{colaborador.setor}</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">EPIs: {colaborador.epiAssignados.length}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {getEPIsColaborador(colaborador).slice(0, 3).map((epi) => (
                  <Badge key={epi.id} variant="outline" className="text-xs bg-secondary/20 border-secondary/50 text-secondary-foreground">
                    {epi.nome}
                  </Badge>
                ))}
                {colaborador.epiAssignados.length > 3 && (
                  <Badge variant="outline" className="text-xs bg-muted text-muted-foreground">
                    +{colaborador.epiAssignados.length - 3} mais
                  </Badge>
                )}
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full mt-2 border-primary/30 text-primary hover:bg-primary/10"
              onClick={() => onOpenDetails(colaborador)}
            >
              Ver detalhes
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ColaboradorCard;
