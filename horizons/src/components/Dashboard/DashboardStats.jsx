import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Activity, AlertTriangle, CheckCircle2, ShieldCheck, Users, XCircle } from "lucide-react";
import React from "react";

const StatCard = ({ title, value, icon: Icon, description, delay, children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} className="h-full">
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
        {children}
      </CardContent>
    </Card>
  </motion.div>
);

const DashboardStats = ({ data }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch h-full">
      <StatCard title="Colaboradores" value={data.totalColaboradores} icon={Users} description="Ativos no sistema" delay={0.1} />
      <StatCard title="EPIs Cadastrados" value={data.totalEPIs} icon={ShieldCheck} description="Total no sistema" delay={0.2} />
      <StatCard title="Acessos Hoje" value={data.acessosHoje} icon={Activity} delay={0.3}>
        <div className="mt-1 flex items-center gap-1">
          <Badge variant="success" className="text-xs gap-1 px-1.5 py-0.5">
            <CheckCircle2 className="h-3 w-3"/> {data.acessosAutorizadosHoje}
          </Badge>
          <Badge variant="destructive" className="text-xs gap-1 px-1.5 py-0.5">
            <XCircle className="h-3 w-3"/> {data.acessosNegadosHoje}
          </Badge>
        </div>
      </StatCard>
      <StatCard title="EPIs Críticos" value={data.episCriticos} icon={AlertTriangle} delay={0.4}>
        <div className="mt-1 flex items-center gap-1">
          <Badge variant="destructive" className="text-xs gap-1 px-1.5 py-0.5">
            <XCircle className="h-3 w-3"/> {data.episVencidos}
          </Badge>
          <Badge variant="warning" className="text-xs gap-1 px-1.5 py-0.5">
            <AlertTriangle className="h-3 w-3"/> {data.episProximosVencimento}
          </Badge>
        </div>
      </StatCard>
    </div>
  );
};

export default DashboardStats;
