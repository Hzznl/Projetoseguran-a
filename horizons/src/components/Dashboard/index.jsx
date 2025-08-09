import {
  tiposOcorrencia as allTiposOcorrencia,
  colaboradoresData,
  getOcorrencias,
  getRegistrosAcesso,
  loadEpiData
} from "@/lib/data";
import { tiposOcorrenciaComCores } from "@/lib/data/ocorrencias-data";
import { format, parseISO, startOfDay, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Shield, User } from 'lucide-react';
import React from "react";
import { Bar, BarChart, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card from "./Card";
import CardIndicator from "./CardIndicator";
import DashboardStats from "./DashboardStats";
import StatusBar from "./StatusBar";
import UltimosAcessos from "./UltimosAcessos";

const Dashboard = () => {
  // Load EPIs data directly from storage
  const epiData = loadEpiData();
  const totalColaboradores = colaboradoresData.length;
  const totalEPIs = epiData.length;
  const episVencidos = epiData.filter(epi => epi.status === "vencido").length;
  const episProximosVencimento = epiData.filter(epi => epi.status === "próximo do vencimento").length;
  const episCriticos = episVencidos + episProximosVencimento;
  const episValidos = epiData.filter(epi => epi.status === "válido").length;
  
  const todosRegistrosAcesso = getRegistrosAcesso();
  const hojeISO = startOfDay(new Date()).toISOString().split('T')[0];
  const acessosHoje = todosRegistrosAcesso.filter(reg => parseISO(reg.data).toISOString().split('T')[0] === hojeISO);
  const acessosAutorizadosHoje = acessosHoje.filter(reg => reg.statusAcesso === "autorizado").length;
  const acessosNegadosHoje = acessosHoje.filter(reg => reg.statusAcesso === "negado").length;
  
  const ultimosRegistrosAcesso = [...todosRegistrosAcesso]
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .slice(0, 5);

  const getAcessosUltimos7Dias = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const dia = subDays(new Date(), i);
      const diaFormatado = format(dia, 'yyyy-MM-dd');
      const nomeDia = format(dia, 'dd/MM', { locale: ptBR });
      
      const acessosNoDia = todosRegistrosAcesso.filter(reg => parseISO(reg.data).toISOString().split('T')[0] === diaFormatado);
      
      data.push({
        name: nomeDia,
        autorizados: acessosNoDia.filter(reg => reg.statusAcesso === "autorizado").length,
        negados: acessosNoDia.filter(reg => reg.statusAcesso === "negado").length,
      });
    }
    return data;
  };
  const acessosChartData = getAcessosUltimos7Dias();

  const todasOcorrencias = getOcorrencias();
  const getOcorrenciasUltimos7Dias = () => {
    const data = [];
    const tiposOcorrenciaUnicos = allTiposOcorrencia;

    for (let i = 6; i >= 0; i--) {
      const dia = subDays(new Date(), i);
      const diaFormatado = format(dia, 'yyyy-MM-dd');
      const nomeDia = format(dia, 'dd/MM', { locale: ptBR });
      
      const ocorrenciasNoDia = todasOcorrencias.filter(ocor => format(parseISO(ocor.dataCriacao), 'yyyy-MM-dd') === diaFormatado);
      
      const counts = {};
      tiposOcorrenciaUnicos.forEach(tipo => counts[tipo] = 0);
      ocorrenciasNoDia.forEach(ocor => {
        if (counts[ocor.tipo] !== undefined) {
          counts[ocor.tipo]++;
        }
      });
      
      data.push({
        name: nomeDia,
        ...counts
      });
    }
    return data;
  };
  const ocorrenciasChartData = getOcorrenciasUltimos7Dias();

  const statsData = {
    totalColaboradores,
    totalEPIs,
    acessosHoje: acessosAutorizadosHoje + acessosNegadosHoje,
    acessosAutorizadosHoje,
    acessosNegadosHoje,
    episCriticos,
    episVencidos,
    episProximosVencimento
  };

  return (
    <div className="container py-6 space-y-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-3xl font-bold"
      >
        Dashboard
      </motion.h1>
      
      <DashboardStats data={statsData} />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <CardIndicator
          icon={<User className="text-primary" size={32} />}
          label="Colaboradores"
          value={totalColaboradores}
          color="primary"
        />
        <CardIndicator
          icon={<Shield className="text-blue-500" size={32} />}
          label="EPIs Cadastrados"
          value={totalEPIs}
          color="blue"
        />
        <CardIndicator
          icon={<CheckCircle className="text-green-500" size={32} />}
          label="Acessos Hoje"
          value={acessosHoje.length}
          color="green"
          subvalue={`${acessosAutorizadosHoje} autorizados / ${acessosNegadosHoje} negados`}
        />
        <CardIndicator
          icon={<AlertTriangle className="text-red-500" size={32} />}
          label="EPIs Críticos"
          value={episCriticos}
          color="red"
          gaugeValue={Math.round((episVencidos / totalEPIs) * 100)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="font-bold mb-2">Acessos nos Últimos 7 Dias</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={acessosChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend
                formatter={(value) => {
                  const total = acessosChartData.reduce((acc, cur) => acc + (cur[value] || 0), 0);
                  return `${value}: ${total}`;
                }}
              />
              <Line
                type="monotone"
                dataKey="autorizados"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, stroke: '#22c55e', fill: '#fff' }}
              />
              <Line
                type="monotone"
                dataKey="negados"
                stroke="#f87171"
                strokeWidth={3}
                dot={(props) => {
                  const { autorizados, negados } = props.payload;
                  const deslocar = autorizados === negados && autorizados !== 0;
                  return (
                    <circle
                      key={`${props.cx}-${props.cy}`}
                      cx={props.cx}
                      cy={deslocar ? props.cy + 6 : props.cy}
                      r={4}
                      stroke="#f87171"
                      strokeWidth={2}
                      fill="#fff"
                    />
                  );
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-4">
          <h3 className="font-bold mb-2">Ocorrências por Tipo</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ocorrenciasChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {tiposOcorrenciaComCores.map(({ tipo, cor }) => (
                <Bar
                  key={tipo}
                  dataKey={tipo}
                  fill={cor}
                  stackId="a"
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4 col-span-1">
          <h3 className="font-bold mb-2">Status dos EPIs</h3>
          <StatusBar label="Válidos" value={episValidos} total={totalEPIs} color="green" />
          <StatusBar label="Próximos do Vencimento" value={episProximosVencimento} total={totalEPIs} color="yellow" />
          <StatusBar label="Vencidos" value={episVencidos} total={totalEPIs} color="red" />
        </Card>
        <Card className="p-4 col-span-2 h-fit">
          <h3 className="font-bold mb-2">Últimos Acessos</h3>
          <UltimosAcessos registros={ultimosRegistrosAcesso} colaboradores={colaboradoresData} />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
