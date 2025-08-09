
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

const UltimosAcessos = ({ registros, colaboradores }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Últimos Acessos Registrados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {registros.length > 0 ? registros.map((registro) => {
            const colaborador = colaboradores.find(c => c.id === registro.colaboradorId);
            const dataFormatada = new Date(registro.data).toLocaleString('pt-BR', {
              day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
            });
            
            return (
              <div key={registro.id} className="flex items-center justify-between gap-3 p-2.5 rounded-md hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full ${registro.statusAcesso === "autorizado" ? "bg-success/10" : "bg-destructive/10"}`}>
                    {registro.statusAcesso === "autorizado" ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-sm font-medium leading-none">
                      {colaborador?.nome || `Colaborador ID: ${registro.colaboradorId}`}
                    </p>
                    <p className={`text-xs ${registro.statusAcesso === "autorizado" ? "text-success" : "text-destructive"}`}>
                      {registro.statusAcesso === "autorizado" ? "Acesso autorizado" : "Acesso negado"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{dataFormatada}</span>
                </div>
              </div>
            );
          }) : (
            <p className="text-sm text-muted-foreground text-center py-4">Nenhum registro de acesso ainda.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UltimosAcessos;
