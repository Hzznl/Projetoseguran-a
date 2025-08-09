import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Calendar, CheckSquare, Clock, AlertTriangle, DollarSign, FileText, Plus, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const SistemaManutencao = ({ epis }) => {
  const [manutencoes, setManutencoes] = useState([]);
  const [agenda, setAgenda] = useState([]);
  const [checklists, setChecklists] = useState([]);
  const [custos, setCustos] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [novaManutencao, setNovaManutencao] = useState({
    epiId: '',
    tipo: 'preventiva',
    dataAgendada: '',
    responsavel: '',
    descricao: '',
    prioridade: 'media',
    custoEstimado: 0
  });

  // Dados simulados de manutenções
  useEffect(() => {
    const manutencoesData = [
      {
        id: 1,
        epiId: 1,
        epiNome: 'Capacete de Segurança',
        tipo: 'preventiva',
        status: 'agendada',
        dataAgendada: '2024-03-15',
        dataConclusao: null,
        responsavel: 'João Silva',
        descricao: 'Inspeção geral e limpeza',
        prioridade: 'alta',
        custoEstimado: 50,
        custoReal: null,
        checklist: [
          { item: 'Verificar integridade da casca', concluido: false },
          { item: 'Limpar sujidades', concluido: false },
          { item: 'Verificar sistema de ajuste', concluido: false },
          { item: 'Testar absorção de impacto', concluido: false }
        ]
      },
      {
        id: 2,
        epiId: 2,
        epiNome: 'Respirador PFF2',
        tipo: 'corretiva',
        status: 'em_andamento',
        dataAgendada: '2024-03-10',
        dataConclusao: null,
        responsavel: 'Maria Santos',
        descricao: 'Substituição de filtros',
        prioridade: 'critica',
        custoEstimado: 120,
        custoReal: null,
        checklist: [
          { item: 'Remover filtros antigos', concluido: true },
          { item: 'Limpar válvulas', concluido: true },
          { item: 'Instalar novos filtros', concluido: false },
          { item: 'Testar vedação', concluido: false }
        ]
      },
      {
        id: 3,
        epiId: 3,
        epiNome: 'Protetor Auditivo',
        tipo: 'preventiva',
        status: 'concluida',
        dataAgendada: '2024-03-05',
        dataConclusao: '2024-03-05',
        responsavel: 'Pedro Costa',
        descricao: 'Limpeza e verificação',
        prioridade: 'baixa',
        custoEstimado: 30,
        custoReal: 25,
        checklist: [
          { item: 'Limpar protetores', concluido: true },
          { item: 'Verificar integridade', concluido: true },
          { item: 'Testar isolamento', concluido: true }
        ]
      }
    ];

    const agendaData = [
      {
        id: 1,
        epiId: 1,
        epiNome: 'Capacete de Segurança',
        data: '2024-03-15',
        tipo: 'preventiva',
        responsavel: 'João Silva',
        status: 'agendada'
      },
      {
        id: 2,
        epiId: 4,
        epiNome: 'Luvas de Proteção',
        data: '2024-03-20',
        tipo: 'preventiva',
        responsavel: 'Ana Oliveira',
        status: 'agendada'
      },
      {
        id: 3,
        epiId: 5,
        epiNome: 'Óculos de Segurança',
        data: '2024-03-25',
        tipo: 'preventiva',
        responsavel: 'Carlos Lima',
        status: 'agendada'
      }
    ];

    const custosData = [
      { mes: 'Janeiro', preventiva: 850, corretiva: 1200, total: 2050 },
      { mes: 'Fevereiro', preventiva: 920, corretiva: 800, total: 1720 },
      { mes: 'Março', preventiva: 750, corretiva: 1500, total: 2250 },
      { mes: 'Abril', preventiva: 680, corretiva: 950, total: 1630 }
    ];

    setManutencoes(manutencoesData);
    setAgenda(agendaData);
    setCustos(custosData);
  }, []);

  const adicionarManutencao = () => {
    if (novaManutencao.epiId && novaManutencao.dataAgendada) {
      const epi = epis.find(e => e.id === parseInt(novaManutencao.epiId));
      const manutencao = {
        id: Date.now(),
        epiId: parseInt(novaManutencao.epiId),
        epiNome: epi ? epi.nome : 'EPI não encontrado',
        ...novaManutencao,
        status: 'agendada',
        dataConclusao: null,
        custoReal: null,
        checklist: []
      };
      
      setManutencoes(prev => [manutencao, ...prev]);
      setNovaManutencao({
        epiId: '',
        tipo: 'preventiva',
        dataAgendada: '',
        responsavel: '',
        descricao: '',
        prioridade: 'media',
        custoEstimado: 0
      });
    }
  };

  const atualizarChecklist = (manutencaoId, itemIndex, concluido) => {
    setManutencoes(prev => 
      prev.map(manutencao => {
        if (manutencao.id === manutencaoId) {
          const checklistAtualizado = [...manutencao.checklist];
          checklistAtualizado[itemIndex].concluido = concluido;
          
          const todosConcluidos = checklistAtualizado.every(item => item.concluido);
          const status = todosConcluidos ? 'concluida' : 'em_andamento';
          
          return {
            ...manutencao,
            checklist: checklistAtualizado,
            status,
            dataConclusao: todosConcluidos ? new Date().toISOString().split('T')[0] : manutencao.dataConclusao
          };
        }
        return manutencao;
      })
    );
  };

  const manutencoesFiltradas = manutencoes.filter(manutencao => {
    if (filtroStatus === 'todos') return true;
    return manutencao.status === filtroStatus;
  });

  const getCorStatus = (status) => {
    switch (status) {
      case 'agendada': return 'bg-blue-100 text-blue-800';
      case 'em_andamento': return 'bg-yellow-100 text-yellow-800';
      case 'concluida': return 'bg-green-100 text-green-800';
      case 'atrasada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCorPrioridade = (prioridade) => {
    switch (prioridade) {
      case 'critica': return 'bg-red-100 text-red-800';
      case 'alta': return 'bg-orange-100 text-orange-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const calcularProgresso = (checklist) => {
    if (checklist.length === 0) return 0;
    const concluidos = checklist.filter(item => item.concluido).length;
    return Math.round((concluidos / checklist.length) * 100);
  };

  const calcularCustosTotais = () => {
    return manutencoes.reduce((acc, manutencao) => {
      const custo = manutencao.custoReal || manutencao.custoEstimado;
      return acc + custo;
    }, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Sistema de Manutenção Preventiva</h2>
          <p className="text-muted-foreground">Gerencie manutenções, checklists e custos</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Wrench className="w-4 h-4" />
            {manutencoes.filter(m => m.status === 'agendada').length} agendadas
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="manutencoes" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="manutencoes">Manutenções</TabsTrigger>
          <TabsTrigger value="agenda">Agenda</TabsTrigger>
          <TabsTrigger value="checklists">Checklists</TabsTrigger>
          <TabsTrigger value="custos">Custos</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="manutencoes" className="space-y-4">
          <div className="flex items-center justify-between">
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="agendada">Agendadas</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="concluida">Concluídas</SelectItem>
                <SelectItem value="atrasada">Atrasadas</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={() => document.getElementById('nova-manutencao').showModal()}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Manutenção
            </Button>
          </div>

          <div className="space-y-4">
            {manutencoesFiltradas.map((manutencao) => (
              <motion.div
                key={manutencao.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{manutencao.epiNome}</h3>
                      <Badge className={getCorStatus(manutencao.status)}>
                        {manutencao.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <Badge className={getCorPrioridade(manutencao.prioridade)}>
                        {manutencao.prioridade.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{manutencao.descricao}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Responsável: {manutencao.responsavel}</span>
                      <span>Data: {manutencao.dataAgendada}</span>
                      <span>Custo: R$ {manutencao.custoEstimado}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {manutencao.checklist.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Checklist</span>
                      <span className="text-sm text-muted-foreground">
                        {calcularProgresso(manutencao.checklist)}% concluído
                      </span>
                    </div>
                    <Progress value={calcularProgresso(manutencao.checklist)} className="h-2" />
                    <div className="space-y-1">
                      {manutencao.checklist.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Checkbox
                            checked={item.concluido}
                            onCheckedChange={(checked) => atualizarChecklist(manutencao.id, index, checked)}
                            disabled={manutencao.status === 'concluida'}
                          />
                          <Label className={`text-sm ${item.concluido ? 'line-through text-muted-foreground' : ''}`}>
                            {item.item}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="agenda" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Agenda de Manutenções
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agenda.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.epiNome}</h4>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(item.data), 'dd/MM/yyyy', { locale: ptBR })}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Responsável: {item.responsavel} | Tipo: {item.tipo}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getCorStatus(item.status)}>
                        {item.status.toUpperCase()}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklists" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5" />
                Checklists de Manutenção
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {manutencoes.filter(m => m.checklist.length > 0).map((manutencao) => (
                  <div key={manutencao.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{manutencao.epiNome}</h4>
                      <Badge className={getCorStatus(manutencao.status)}>
                        {manutencao.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {manutencao.checklist.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Checkbox
                            checked={item.concluido}
                            onCheckedChange={(checked) => atualizarChecklist(manutencao.id, index, checked)}
                            disabled={manutencao.status === 'concluida'}
                          />
                          <Label className={`text-sm ${item.concluido ? 'line-through text-muted-foreground' : ''}`}>
                            {item.item}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progresso</span>
                        <span>{calcularProgresso(manutencao.checklist)}%</span>
                      </div>
                      <Progress value={calcularProgresso(manutencao.checklist)} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Custos Totais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      R$ {calcularCustosTotais().toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Geral</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      R$ {manutencoes.filter(m => m.tipo === 'preventiva').reduce((acc, m) => acc + (m.custoReal || m.custoEstimado), 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Preventiva</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      R$ {manutencoes.filter(m => m.tipo === 'corretiva').reduce((acc, m) => acc + (m.custoReal || m.custoEstimado), 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Corretiva</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Histórico de Custos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {custos.map((custo, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{custo.mes}</div>
                        <div className="text-sm text-muted-foreground">
                          Preventiva: R$ {custo.preventiva} | Corretiva: R$ {custo.corretiva}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">R$ {custo.total}</div>
                        <div className="text-xs text-muted-foreground">Total</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Análise de Custos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round((manutencoes.filter(m => m.tipo === 'preventiva').length / manutencoes.length) * 100)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Preventiva</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {Math.round((manutencoes.filter(m => m.tipo === 'corretiva').length / manutencoes.length) * 100)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Corretiva</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {manutencoes.filter(m => m.status === 'concluida').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Concluídas</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="relatorios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Relatórios de Manutenção
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h4 className="font-semibold">Estatísticas Gerais</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total de Manutenções</span>
                      <span className="font-semibold">{manutencoes.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Em Andamento</span>
                      <span className="font-semibold text-yellow-600">
                        {manutencoes.filter(m => m.status === 'em_andamento').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Concluídas</span>
                      <span className="font-semibold text-green-600">
                        {manutencoes.filter(m => m.status === 'concluida').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Atrasadas</span>
                      <span className="font-semibold text-red-600">
                        {manutencoes.filter(m => m.status === 'atrasada').length}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Ações Rápidas</h4>
                  <div className="space-y-2">
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Gerar Relatório Mensal
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Verificar Atrasos
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Análise de Custos
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Agenda do Mês
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal para nova manutenção */}
      <dialog id="nova-manutencao" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Nova Manutenção</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="epi-manutencao">EPI</Label>
              <Select 
                value={novaManutencao.epiId} 
                onValueChange={(value) => setNovaManutencao(prev => ({ ...prev, epiId: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o EPI" />
                </SelectTrigger>
                <SelectContent>
                  {epis.map((epi) => (
                    <SelectItem key={epi.id} value={epi.id.toString()}>
                      {epi.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tipo-manutencao">Tipo</Label>
                <Select 
                  value={novaManutencao.tipo} 
                  onValueChange={(value) => setNovaManutencao(prev => ({ ...prev, tipo: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="preventiva">Preventiva</SelectItem>
                    <SelectItem value="corretiva">Corretiva</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="prioridade-manutencao">Prioridade</Label>
                <Select 
                  value={novaManutencao.prioridade} 
                  onValueChange={(value) => setNovaManutencao(prev => ({ ...prev, prioridade: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baixa">Baixa</SelectItem>
                    <SelectItem value="media">Média</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="critica">Crítica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="data-manutencao">Data Agendada</Label>
              <Input
                id="data-manutencao"
                type="date"
                value={novaManutencao.dataAgendada}
                onChange={(e) => setNovaManutencao(prev => ({ ...prev, dataAgendada: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="responsavel-manutencao">Responsável</Label>
              <Input
                id="responsavel-manutencao"
                value={novaManutencao.responsavel}
                onChange={(e) => setNovaManutencao(prev => ({ ...prev, responsavel: e.target.value }))}
                placeholder="Nome do responsável"
              />
            </div>
            <div>
              <Label htmlFor="descricao-manutencao">Descrição</Label>
              <Textarea
                id="descricao-manutencao"
                value={novaManutencao.descricao}
                onChange={(e) => setNovaManutencao(prev => ({ ...prev, descricao: e.target.value }))}
                placeholder="Descrição da manutenção"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="custo-manutencao">Custo Estimado (R$)</Label>
              <Input
                id="custo-manutencao"
                type="number"
                value={novaManutencao.custoEstimado}
                onChange={(e) => setNovaManutencao(prev => ({ ...prev, custoEstimado: parseFloat(e.target.value) || 0 }))}
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <div className="modal-action">
            <Button variant="outline" onClick={() => document.getElementById('nova-manutencao').close()}>
              Cancelar
            </Button>
            <Button onClick={() => {
              adicionarManutencao();
              document.getElementById('nova-manutencao').close();
            }}>
              Adicionar Manutenção
            </Button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SistemaManutencao; 