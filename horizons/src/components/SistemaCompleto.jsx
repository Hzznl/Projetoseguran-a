import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BookOpen, Wrench, Shield, Building2, MessageCircle, TrendingUp, Settings, BarChart3, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import SistemaNotificacoes from './SistemaNotificacoes';
import ModuloTreinamentos from './ModuloTreinamentos';
import SistemaManutencao from './SistemaManutencao';
import SistemaCompliance from './SistemaCompliance';
import GestaoFornecedores from './GestaoFornecedores';
import SistemaComunicacao from './SistemaComunicacao';

const getCorModulo = (cor) => {
  const cores = {
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    green: 'bg-green-100 text-green-800 border-green-200',
    orange: 'bg-orange-100 text-orange-800 border-orange-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
    indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    pink: 'bg-pink-100 text-pink-800 border-pink-200'
  };
  return cores[cor] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const SistemaCompleto = ({ epis }) => {
  const [moduloAtivo, setModuloAtivo] = useState('overview');
  const [estatisticas, setEstatisticas] = useState({
    notificacoes: 0,
    treinamentos: 0,
    manutencoes: 0,
    compliance: 0,
    fornecedores: 0,
    comunicacoes: 0
  });

  // Debug: verificar se o componente está sendo renderizado
  console.log('SistemaCompleto renderizado com epis:', epis);

  // Simular estatísticas dos módulos
  useEffect(() => {
    setEstatisticas({
      notificacoes: Math.floor(Math.random() * 20) + 5,
      treinamentos: Math.floor(Math.random() * 15) + 3,
      manutencoes: Math.floor(Math.random() * 10) + 2,
      compliance: Math.floor(Math.random() * 100) + 70,
      fornecedores: Math.floor(Math.random() * 10) + 3,
      comunicacoes: Math.floor(Math.random() * 50) + 10
    });
  }, []);

  const modulos = [
    {
      id: 'notificacoes',
      titulo: 'Sistema de Notificações',
      descricao: 'Alertas inteligentes e comunicações em tempo real',
      icone: Bell,
      cor: 'blue',
      estatistica: estatisticas.notificacoes,
      unidade: 'alertas'
    },
    {
      id: 'treinamentos',
      titulo: 'Módulo de Treinamentos',
      descricao: 'Cursos online, certificações e quiz interativo',
      icone: BookOpen,
      cor: 'green',
      estatistica: estatisticas.treinamentos,
      unidade: 'cursos'
    },
    {
      id: 'manutencao',
      titulo: 'Sistema de Manutenção',
      descricao: 'Agenda preventiva, checklists e controle de custos',
      icone: Wrench,
      cor: 'orange',
      estatistica: estatisticas.manutencoes,
      unidade: 'agendadas'
    },
    {
      id: 'compliance',
      titulo: 'Sistema de Compliance',
      descricao: 'Auditorias, riscos e conformidade regulatória',
      icone: Shield,
      cor: 'purple',
      estatistica: estatisticas.compliance,
      unidade: '% score'
    },
    {
      id: 'fornecedores',
      titulo: 'Gestão de Fornecedores',
      descricao: 'Cadastro, avaliação e controle de fornecedores',
      icone: Building2,
      cor: 'indigo',
      estatistica: estatisticas.fornecedores,
      unidade: 'ativos'
    },
    {
      id: 'comunicacao',
      titulo: 'Comunicação Interna',
      descricao: 'Chat, fórum, sugestões e feedback colaborativo',
      icone: MessageCircle,
      cor: 'pink',
      estatistica: estatisticas.comunicacoes,
      unidade: 'mensagens'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Sistema Completo de Gestão de EPIs</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Módulos integrados para gestão completa de segurança</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1 text-xs sm:text-sm">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
            Sistema Integrado
          </Badge>
        </div>
      </div>

      <Tabs value={moduloAtivo} onValueChange={setModuloAtivo} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 sm:grid-cols-7 gap-1 p-1">
          <TabsTrigger value="overview" className="text-xs sm:text-sm px-2 sm:px-3">Visão Geral</TabsTrigger>
          <TabsTrigger value="notificacoes" className="text-xs sm:text-sm px-2 sm:px-3">Notificações</TabsTrigger>
          <TabsTrigger value="treinamentos" className="text-xs sm:text-sm px-2 sm:px-3">Treinamentos</TabsTrigger>
          <TabsTrigger value="manutencao" className="text-xs sm:text-sm px-2 sm:px-3">Manutenção</TabsTrigger>
          <TabsTrigger value="compliance" className="text-xs sm:text-sm px-2 sm:px-3">Compliance</TabsTrigger>
          <TabsTrigger value="fornecedores" className="text-xs sm:text-sm px-2 sm:px-3">Fornecedores</TabsTrigger>
          <TabsTrigger value="comunicacao" className="text-xs sm:text-sm px-2 sm:px-3">Comunicação</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <OverviewSistema modulos={modulos} />
        </TabsContent>

        <TabsContent value="notificacoes" className="space-y-4">
          <SistemaNotificacoes epis={epis} />
        </TabsContent>

        <TabsContent value="treinamentos" className="space-y-4">
          <ModuloTreinamentos />
        </TabsContent>

        <TabsContent value="manutencao" className="space-y-4">
          <SistemaManutencao epis={epis} />
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <SistemaCompliance epis={epis} />
        </TabsContent>

        <TabsContent value="fornecedores" className="space-y-4">
          <GestaoFornecedores />
        </TabsContent>

        <TabsContent value="comunicacao" className="space-y-4">
          <SistemaComunicacao />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const OverviewSistema = ({ modulos }) => {
  const handleModuloClick = (moduloId) => {
    // Encontrar o elemento pai que contém o Tabs
    const tabsContainer = document.querySelector('[data-radix-tabs-root]');
    if (tabsContainer) {
      // Encontrar o trigger da aba correspondente
      const tabTrigger = tabsContainer.querySelector(`[data-state][value="${moduloId}"]`);
      if (tabTrigger) {
        tabTrigger.click();
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {modulos.map((modulo) => (
          <motion.div
            key={modulo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="border rounded-lg p-3 sm:p-4 hover:shadow-md transition-all cursor-pointer"
            onClick={() => handleModuloClick(modulo.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {React.createElement(modulo.icone, { className: `w-4 h-4 sm:w-5 sm:h-5 text-${modulo.cor}-600` })}
                  <h3 className="font-semibold text-sm sm:text-base">{modulo.titulo}</h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3">{modulo.descricao}</p>
                <div className="flex items-center justify-between">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600">
                    {modulo.estatistica}
                  </div>
                  <Badge className={`text-xs ${getCorModulo(modulo.cor)}`}>
                    {modulo.unidade}
                  </Badge>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
              Estatísticas Gerais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between text-sm sm:text-base">
                <span>Total de Módulos</span>
                <span className="font-semibold">{modulos.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm sm:text-base">
                <span>Score de Compliance</span>
                <span className="font-semibold text-green-600">
                  {modulos.find(m => m.id === 'compliance')?.estatistica}%
                </span>
              </div>
              <div className="flex items-center justify-between text-sm sm:text-base">
                <span>Notificações Ativas</span>
                <span className="font-semibold text-blue-600">
                  {modulos.find(m => m.id === 'notificacoes')?.estatistica}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm sm:text-base">
                <span>Treinamentos Disponíveis</span>
                <span className="font-semibold text-green-600">
                  {modulos.find(m => m.id === 'treinamentos')?.estatistica}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
              Status do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                <span className="text-xs sm:text-sm">Sistema de Notificações</span>
                <Badge className="bg-green-100 text-green-800 text-xs">Ativo</Badge>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                <span className="text-xs sm:text-sm">Módulo de Treinamentos</span>
                <Badge className="bg-green-100 text-green-800 text-xs">Ativo</Badge>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                <span className="text-xs sm:text-sm">Sistema de Manutenção</span>
                <Badge className="bg-green-100 text-green-800 text-xs">Ativo</Badge>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                <span className="text-xs sm:text-sm">Compliance Avançado</span>
                <Badge className="bg-green-100 text-green-800 text-xs">Ativo</Badge>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                <span className="text-xs sm:text-sm">Gestão de Fornecedores</span>
                <Badge className="bg-green-100 text-green-800 text-xs">Ativo</Badge>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                <span className="text-xs sm:text-sm">Comunicação Interna</span>
                <Badge className="bg-green-100 text-green-800 text-xs">Ativo</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
            Alertas e Ações Necessárias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 border border-yellow-200 rounded-lg bg-yellow-50">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-yellow-800 text-sm sm:text-base">EPIs próximos do vencimento</p>
                <p className="text-xs sm:text-sm text-yellow-700">5 equipamentos precisam de atenção</p>
              </div>
              <Button size="sm" variant="outline" className="text-xs sm:text-sm">Verificar</Button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 border border-blue-200 rounded-lg bg-blue-50">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-blue-800 text-sm sm:text-base">Novos treinamentos disponíveis</p>
                <p className="text-xs sm:text-sm text-blue-700">3 cursos aguardam aprovação</p>
              </div>
              <Button size="sm" variant="outline" className="text-xs sm:text-sm">Revisar</Button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 border border-green-200 rounded-lg bg-green-50">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-green-800 text-sm sm:text-base">Sistema funcionando normalmente</p>
                <p className="text-xs sm:text-sm text-green-700">Todos os módulos operacionais</p>
              </div>
              <Button size="sm" variant="outline" className="text-xs sm:text-sm">Detalhes</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SistemaCompleto; 