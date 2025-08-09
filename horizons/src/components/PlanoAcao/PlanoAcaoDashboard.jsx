import { planoAcaoData } from '@/lib/data/plano-acao-data';
import { AlertCircle, AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import React from 'react';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';

const PlanoAcaoDashboard = () => {
  // Calcular estatísticas baseadas nos dados reais
  const acoes = planoAcaoData.acoes;
  
  const stats = {
    totalAcoes: acoes.length,
    acoesPendentes: acoes.filter(a => a.status === 'pendente').length,
    acoesEmAndamento: acoes.filter(a => a.status === 'em_andamento').length,
    acoesConcluidas: acoes.filter(a => a.status === 'concluida').length,
    acoesAtrasadas: acoes.filter(a => a.status === 'atrasada').length,
    eficaciaMedia: Math.round(
      acoes.filter(a => a.eficacia !== null)
        .reduce((sum, a) => sum + a.eficacia, 0) / 
        acoes.filter(a => a.eficacia !== null).length
    ) || 0
  };

  // Calcular ações por setor baseado nos dados reais
  const acoesPorSetor = planoAcaoData.setores.map(setor => {
    const acoesDoSetor = acoes.filter(a => a.setor === setor);
    return {
      setor,
      total: acoesDoSetor.length,
      concluidas: acoesDoSetor.filter(a => a.status === 'concluida').length,
      emAndamento: acoesDoSetor.filter(a => a.status === 'em_andamento').length,
      pendentes: acoesDoSetor.filter(a => a.status === 'pendente').length
    };
  }).filter(item => item.total > 0); // Filtrar apenas setores que têm ações

  // Calcular ações por prioridade baseado nos dados reais
  const acoesPorPrioridade = planoAcaoData.prioridades.map(prioridade => {
    const quantidade = acoes.filter(a => a.prioridade === prioridade.value).length;
    const cores = {
      'alta': 'bg-red-500',
      'media': 'bg-yellow-500',
      'baixa': 'bg-green-500'
    };
    
    return {
      prioridade: prioridade.label,
      quantidade,
      cor: cores[prioridade.value] || 'bg-gray-500'
    };
  }).filter(item => item.quantidade > 0); // Filtrar apenas prioridades que têm ações

  // Ações próximas do vencimento (próximas de 7 dias)
  const hoje = new Date();
  const acoesProximasVencimento = acoes
    .filter(acao => {
      const prazo = new Date(acao.prazo);
      const diffTime = prazo - hoje;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7 && diffDays >= 0 && acao.status !== 'concluida';
    })
    .sort((a, b) => new Date(a.prazo) - new Date(b.prazo))
    .slice(0, 3); // Limitar a 3 ações

  const getPrioridadeColor = (prioridade) => {
    switch (prioridade) {
      case 'alta': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'media': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'baixa': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getPrioridadeLabel = (prioridade) => {
    switch (prioridade) {
      case 'alta': return 'Alta';
      case 'media': return 'Média';
      case 'baixa': return 'Baixa';
      default: return 'Não definida';
    }
  };

  const calcularProgresso = (concluidas, total) => {
    return total > 0 ? Math.round((concluidas / total) * 100) : 0;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Cards de estatísticas */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-card-foreground">Total de Ações</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-card-foreground">{stats.totalAcoes}</div>
          <p className="text-xs text-muted-foreground">
            Ações planejadas
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
            Aguardando início
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-card-foreground">Em Andamento</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{stats.acoesEmAndamento}</div>
          <p className="text-xs text-muted-foreground">
            Sendo executadas
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-card-foreground">Concluídas</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stats.acoesConcluidas}</div>
          <p className="text-xs text-muted-foreground">
            Finalizadas com sucesso
          </p>
        </CardContent>
      </Card>

      {/* Progresso geral */}
      <Card className="lg:col-span-2 bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Progresso Geral do Plano</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-card-foreground">Progresso Geral</span>
              <span className="text-sm text-muted-foreground">
                {calcularProgresso(stats.acoesConcluidas, stats.totalAcoes)}%
              </span>
            </div>
            <Progress 
              value={calcularProgresso(stats.acoesConcluidas, stats.totalAcoes)} 
              className="h-2"
            />
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-orange-600">{stats.acoesPendentes}</div>
                <div className="text-xs text-muted-foreground">Pendentes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{stats.acoesEmAndamento}</div>
                <div className="text-xs text-muted-foreground">Em Andamento</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.acoesConcluidas}</div>
                <div className="text-xs text-muted-foreground">Concluídas</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ações por prioridade */}
      <Card className="lg:col-span-2 bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Ações por Prioridade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {acoesPorPrioridade.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-card-foreground">{item.prioridade}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.cor}`}
                      style={{ width: `${(item.quantidade / stats.totalAcoes) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-card-foreground">{item.quantidade}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ações por setor */}
      <Card className="lg:col-span-2 bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Progresso por Setor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {acoesPorSetor.map((setor, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-card-foreground">{setor.setor}</span>
                  <span className="text-sm text-muted-foreground">
                    {setor.concluidas}/{setor.total}
                  </span>
                </div>
                <Progress 
                  value={calcularProgresso(setor.concluidas, setor.total)} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ações próximas do vencimento */}
      <Card className="lg:col-span-2 bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Próximas do Vencimento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {acoesProximasVencimento.length > 0 ? (
              acoesProximasVencimento.map((acao) => (
                <div key={acao.id} className="flex items-center justify-between p-2 bg-orange-50 dark:bg-orange-950/20 rounded border border-orange-200 dark:border-orange-800">
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{acao.titulo}</p>
                    <p className="text-xs text-muted-foreground">
                      Vence em: {new Date(acao.prazo).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={getPrioridadeColor(acao.prioridade)}>
                    {getPrioridadeLabel(acao.prioridade)}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                Nenhuma ação próxima do vencimento
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Eficácia das ações */}
      <Card className="lg:col-span-2 bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Eficácia das Ações Concluídas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-card-foreground">Eficácia Média</span>
              <span className="text-2xl font-bold text-green-600">{stats.eficaciaMedia}%</span>
            </div>
            <Progress value={stats.eficaciaMedia} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Baseado na avaliação pós-implementação das ações concluídas
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanoAcaoDashboard; 