import { pgrData } from '@/lib/data/pgr-data';
import { AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import React from 'react';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const PGRDashboard = () => {
  // Calcular estatísticas baseadas nos dados reais
  const riscos = pgrData.riscos;
  
  const stats = {
    totalRiscos: riscos.length,
    riscosAlto: riscos.filter(r => r.classificacao === 'alto').length,
    riscosMedio: riscos.filter(r => r.classificacao === 'medio').length,
    riscosBaixo: riscos.filter(r => r.classificacao === 'baixo').length,
    acoesPendentes: riscos.filter(r => r.status === 'pendente').length,
    acoesConcluidas: riscos.filter(r => r.status === 'concluido').length,
    setoresAtendidos: new Set(riscos.map(r => r.setor)).size
  };

  // Calcular riscos por tipo baseado nos dados reais
  const riscosPorTipo = pgrData.tiposRisco.map(tipo => {
    const quantidade = riscos.filter(r => r.tipoRisco === tipo).length;
    const cores = {
      'Físico': 'bg-blue-500',
      'Químico': 'bg-red-500',
      'Biológico': 'bg-green-500',
      'Ergonômico': 'bg-yellow-500',
      'Mecânico': 'bg-purple-500'
    };
    
    return {
      tipo,
      quantidade,
      cor: cores[tipo] || 'bg-gray-500'
    };
  }).filter(item => item.quantidade > 0); // Filtrar apenas tipos que têm riscos

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Cards de estatísticas */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-card-foreground">Total de Riscos</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-card-foreground">{stats.totalRiscos}</div>
          <p className="text-xs text-muted-foreground">
            Identificados no sistema
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-card-foreground">Ações Pendentes</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">{stats.acoesPendentes}</div>
          <p className="text-xs text-muted-foreground">
            Requerem atenção
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-card-foreground">Ações Concluídas</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stats.acoesConcluidas}</div>
          <p className="text-xs text-muted-foreground">
            Implementadas com sucesso
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-card-foreground">Setores Atendidos</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-card-foreground">{stats.setoresAtendidos}</div>
          <p className="text-xs text-muted-foreground">
            Com PGR implementado
          </p>
        </CardContent>
      </Card>

      {/* Gráfico de riscos por classificação */}
      <Card className="lg:col-span-2 bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Classificação de Riscos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-card-foreground">Alto Risco</span>
              </div>
              <Badge variant="destructive">{stats.riscosAlto}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-card-foreground">Médio Risco</span>
              </div>
              <Badge variant="secondary">{stats.riscosMedio}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-card-foreground">Baixo Risco</span>
              </div>
              <Badge variant="outline">{stats.riscosBaixo}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de riscos por tipo */}
      <Card className="lg:col-span-2 bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Riscos por Tipo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {riscosPorTipo.map((risco, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-card-foreground">{risco.tipo}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${risco.cor}`}
                      style={{ width: `${(risco.quantidade / stats.totalRiscos) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-card-foreground">{risco.quantidade}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PGRDashboard; 