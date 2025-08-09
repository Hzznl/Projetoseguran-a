
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { loadEpiData } from "@/lib/data/epi-data";

const ProgressItem = ({ label, value, total, colorClass }) => {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-muted-foreground">
          {value} de {total}
        </span>
      </div>
      <Progress 
        value={percentage} 
        className={`h-2 ${colorClass === "bg-green-500" ? "bg-green-100" : colorClass === "bg-yellow-500" ? "bg-yellow-100" : "bg-red-100"}`}
      >
        <div
          className={`h-full ${colorClass} transition-all`}
          style={{ width: `${percentage}%` }}
        />
      </Progress>
    </div>
  );
};

const EPIStatusProgress = () => {
  // Load EPIs data directly from storage
  const epis = loadEpiData();
  const totalEPIs = epis.length;
  
  // Calculate counts based on status
  const data = {
    validos: epis.filter(epi => epi.status === "válido").length,
    proximosVencimento: epis.filter(epi => epi.status === "próximo do vencimento").length,
    vencidos: epis.filter(epi => epi.status === "vencido").length,
    totalEPIs
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Status dos EPIs
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ProgressItem 
          label="EPIs Válidos" 
          value={data.validos} 
          total={data.totalEPIs} 
          colorClass="bg-green-500" 
        />
        <ProgressItem 
          label="Próximos do Vencimento" 
          value={data.proximosVencimento} 
          total={data.totalEPIs} 
          colorClass="bg-yellow-500" 
        />
        <ProgressItem 
          label="EPIs Vencidos" 
          value={data.vencidos} 
          total={data.totalEPIs} 
          colorClass="bg-red-500" 
        />
      </CardContent>
    </Card>
  );
};

export default EPIStatusProgress;
