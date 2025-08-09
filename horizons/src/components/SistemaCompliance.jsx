import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, FileCheck, AlertTriangle, CheckCircle, XCircle, TrendingUp, BarChart3, Download, Eye, Edit, Plus } from 'lucide-react';
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

const SistemaCompliance = ({ epis }) => {
  const [auditorias, setAuditorias] = useState([]);
  const [riscos, setRiscos] = useState([]);
  const [evidencias, setEvidencias] = useState([]);
  const [relatorios, setRelatorios] = useState([]);
  const [complianceScore, setComplianceScore] = useState(0);
  const [filtroAuditoria, setFiltroAuditoria] = useState('todos');
  const [novaAuditoria, setNovaAuditoria] = useState({
    tipo: 'interna',
    setor: '',
    responsavel: '',
    dataInicio: '',
    dataFim: '',
    descricao: '',
    criterios: []
  });

  // Dados simulados de compliance
  useEffect(() => {
    const auditoriasData = [
      {
        id: 1,
        tipo: 'interna',
        setor: 'Produção',
        responsavel: 'Maria Santos',
        dataInicio: '2024-03-01',
        dataFim: '2024-03-15',
        status: 'em_andamento',
        descricao: 'Auditoria de conformidade dos EPIs na linha de produção',
        criterios: [
          { item: 'Uso correto de EPIs', status: 'conforme', observacao: 'Todos os colaboradores usando EPIs adequados' },
          { item: 'Manutenção preventiva', status: 'nao_conforme', observacao: 'Falta de registro de manutenções' },
          { item: 'Treinamentos atualizados', status: 'conforme', observacao: 'Certificações válidas' },
          { item: 'Documentação completa', status: 'parcial', observacao: 'Alguns registros em falta' }
        ],
        score: 75
      },
      {
        id: 2,
        tipo: 'externa',
        setor: 'Manutenção',
        responsavel: 'João Silva',
        dataInicio: '2024-02-15',
        dataFim: '2024-02-28',
        status: 'concluida',
        descricao: 'Auditoria externa por órgão regulador',
        criterios: [
          { item: 'Conformidade NR-6', status: 'conforme', observacao: 'Atende todos os requisitos' },
          { item: 'Certificações de EPIs', status: 'conforme', observacao: 'Documentação completa' },
          { item: 'Treinamentos obrigatórios', status: 'conforme', observacao: 'Todos os colaboradores treinados' }
        ],
        score: 95
      }
    ];

    const riscosData = [
      {
        id: 1,
        setor: 'Produção',
        risco: 'alto',
        descricao: 'Exposição a produtos químicos sem proteção adequada',
        probabilidade: 0.3,
        impacto: 0.9,
        acoes: [
          'Fornecer EPIs adequados',
          'Treinamento específico',
          'Monitoramento contínuo'
        ],
        status: 'em_acao'
      },
      {
        id: 2,
        setor: 'Manutenção',
        risco: 'medio',
        descricao: 'Queda de altura sem proteção',
        probabilidade: 0.2,
        impacto: 0.8,
        acoes: [
          'Implementar sistema de trava-quedas',
          'Capacete obrigatório',
          'Supervisão constante'
        ],
        status: 'controlado'
      },
      {
        id: 3,
        setor: 'Logística',
        risco: 'baixo',
        descricao: 'Lesões por movimentação manual',
        probabilidade: 0.1,
        impacto: 0.5,
        acoes: [
          'Luvas de proteção',
          'Treinamento de ergonomia',
          'Equipamentos auxiliares'
        ],
        status: 'aceitavel'
      }
    ];

    const evidenciasData = [
      {
        id: 1,
        tipo: 'documento',
        titulo: 'Certificado de Aprovação EPI',
        setor: 'Produção',
        data: '2024-03-10',
        arquivo: 'certificado-epi.pdf',
        status: 'valido',
        auditoriaId: 1
      },
      {
        id: 2,
        tipo: 'foto',
        titulo: 'Inspeção de Capacete',
        setor: 'Manutenção',
        data: '2024-03-08',
        arquivo: 'inspecao-capacete.jpg',
        status: 'valido',
        auditoriaId: 1
      },
      {
        id: 3,
        tipo: 'video',
        titulo: 'Treinamento de Uso de EPIs',
        setor: 'RH',
        data: '2024-03-05',
        arquivo: 'treinamento-epis.mp4',
        status: 'valido',
        auditoriaId: 2
      }
    ];

    const relatoriosData = [
      {
        id: 1,
        tipo: 'mensal',
        periodo: 'Março 2024',
        setor: 'Todos',
        status: 'gerado',
        data: '2024-03-31',
        score: 82
      },
      {
        id: 2,
        tipo: 'trimestral',
        periodo: 'Q1 2024',
        setor: 'Produção',
        status: 'pendente',
        data: '2024-03-31',
        score: 0
      }
    ];

    setAuditorias(auditoriasData);
    setRiscos(riscosData);
    setEvidencias(evidenciasData);
    setRelatorios(relatoriosData);

    // Calcular compliance score geral
    const scoreGeral = Math.round(
      (auditoriasData.reduce((acc, aud) => acc + aud.score, 0) / auditoriasData.length) * 0.6 +
      (riscosData.filter(r => r.status === 'controlado' || r.status === 'aceitavel').length / riscosData.length) * 40
    );
    setComplianceScore(scoreGeral);
  }, []);

  const adicionarAuditoria = () => {
    if (novaAuditoria.setor && novaAuditoria.responsavel) {
      const auditoria = {
        id: Date.now(),
        ...novaAuditoria,
        status: 'agendada',
        criterios: [],
        score: 0
      };
      
      setAuditorias(prev => [auditoria, ...prev]);
      setNovaAuditoria({
        tipo: 'interna',
        setor: '',
        responsavel: '',
        dataInicio: '',
        dataFim: '',
        descricao: '',
        criterios: []
      });
    }
  };

  const adicionarEvidencia = () => {
    const evidencia = {
      id: Date.now(),
      tipo: 'documento',
      titulo: 'Nova Evidência',
      setor: 'Geral',
      data: new Date().toISOString().split('T')[0],
      arquivo: 'evidencia.pdf',
      status: 'valido',
      auditoriaId: null
    };
    
    setEvidencias(prev => [evidencia, ...prev]);
  };

  const auditoriasFiltradas = auditorias.filter(auditoria => {
    if (filtroAuditoria === 'todos') return true;
    return auditoria.status === filtroAuditoria;
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

  const getCorRisco = (risco) => {
    switch (risco) {
      case 'alto': return 'bg-red-100 text-red-800';
      case 'medio': return 'bg-yellow-100 text-yellow-800';
      case 'baixo': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCorConformidade = (status) => {
    switch (status) {
      case 'conforme': return 'bg-green-100 text-green-800';
      case 'nao_conforme': return 'bg-red-100 text-red-800';
      case 'parcial': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calcularScoreAuditoria = (criterios) => {
    if (criterios.length === 0) return 0;
    const conformes = criterios.filter(c => c.status === 'conforme').length;
    const parciais = criterios.filter(c => c.status === 'parcial').length;
    return Math.round((conformes + parciais * 0.5) / criterios.length * 100);
  };

  const calcularRiscoTotal = (risco) => {
    return risco.probabilidade * risco.impacto;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Sistema de Compliance Avançado</h2>
          <p className="text-muted-foreground">Auditoria, riscos e conformidade regulatória</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Shield className="w-4 h-4" />
            Score: {complianceScore}%
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="auditorias" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="auditorias">Auditorias</TabsTrigger>
          <TabsTrigger value="riscos">Riscos</TabsTrigger>
          <TabsTrigger value="evidencias">Evidências</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          <TabsTrigger value="score">Compliance Score</TabsTrigger>
        </TabsList>

        <TabsContent value="auditorias" className="space-y-4">
          <div className="flex items-center justify-between">
            <Select value={filtroAuditoria} onValueChange={setFiltroAuditoria}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar auditorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas</SelectItem>
                <SelectItem value="agendada">Agendadas</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="concluida">Concluídas</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={() => document.getElementById('nova-auditoria').showModal()}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Auditoria
            </Button>
          </div>

          <div className="space-y-4">
            {auditoriasFiltradas.map((auditoria) => (
              <motion.div
                key={auditoria.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">Auditoria {auditoria.tipo.toUpperCase()} - {auditoria.setor}</h3>
                      <Badge className={getCorStatus(auditoria.status)}>
                        {auditoria.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{auditoria.descricao}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Responsável: {auditoria.responsavel}</span>
                      <span>Período: {auditoria.dataInicio} a {auditoria.dataFim}</span>
                      <span>Score: {auditoria.score}%</span>
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

                {auditoria.criterios.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Critérios de Auditoria</h4>
                    <div className="space-y-2">
                      {auditoria.criterios.map((criterio, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <div className="flex items-center gap-2">
                            <Badge className={getCorConformidade(criterio.status)}>
                              {criterio.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                            <span className="text-sm">{criterio.item}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{criterio.observacao}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="riscos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Mapeamento de Riscos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riscos.map((risco) => (
                  <div key={risco.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{risco.setor}</h4>
                          <Badge className={getCorRisco(risco.risco)}>
                            {risco.risco.toUpperCase()}
                          </Badge>
                          <Badge className={getCorStatus(risco.status)}>
                            {risco.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{risco.descricao}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Probabilidade: {Math.round(risco.probabilidade * 100)}%</span>
                          <span>Impacto: {Math.round(risco.impacto * 100)}%</span>
                          <span>Risco Total: {Math.round(calcularRiscoTotal(risco) * 100)}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Ações de Controle</h5>
                      <div className="space-y-1">
                        {risco.acoes.map((acao, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>{acao}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evidencias" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Evidências Digitais</h3>
            <Button onClick={adicionarEvidencia}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Evidência
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {evidencias.map((evidencia) => (
              <motion.div
                key={evidencia.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{evidencia.titulo}</h4>
                      <Badge className={getCorStatus(evidencia.status)}>
                        {evidencia.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Setor: {evidencia.setor}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Data: {evidencia.data}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {evidencia.tipo.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{evidencia.arquivo}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="relatorios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="w-5 h-5" />
                Relatórios para Órgãos Reguladores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {relatorios.map((relatorio) => (
                  <div key={relatorio.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <FileCheck className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Relatório {relatorio.tipo.toUpperCase()}</h4>
                        <p className="text-sm text-muted-foreground">
                          {relatorio.periodo} - {relatorio.setor}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Gerado em: {relatorio.data}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getCorStatus(relatorio.status)}>
                        {relatorio.status.toUpperCase()}
                      </Badge>
                      {relatorio.score > 0 && (
                        <Badge variant="outline">
                          Score: {relatorio.score}%
                        </Badge>
                      )}
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="score" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Compliance Score Geral
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-blue-600">{complianceScore}%</div>
                  <Progress value={complianceScore} className="h-3" />
                  <div className="text-sm text-muted-foreground">
                    {complianceScore >= 90 ? 'Excelente' : 
                     complianceScore >= 80 ? 'Bom' : 
                     complianceScore >= 70 ? 'Regular' : 'Necessita Melhorias'}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Auditorias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span className="font-semibold">{auditorias.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Concluídas</span>
                    <span className="font-semibold text-green-600">
                      {auditorias.filter(a => a.status === 'concluida').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Em Andamento</span>
                    <span className="font-semibold text-yellow-600">
                      {auditorias.filter(a => a.status === 'em_andamento').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Score Médio</span>
                    <span className="font-semibold text-blue-600">
                      {Math.round(auditorias.reduce((acc, a) => acc + a.score, 0) / auditorias.length)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Riscos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span className="font-semibold">{riscos.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Controlados</span>
                    <span className="font-semibold text-green-600">
                      {riscos.filter(r => r.status === 'controlado').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Em Ação</span>
                    <span className="font-semibold text-yellow-600">
                      {riscos.filter(r => r.status === 'em_acao').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Aceitáveis</span>
                    <span className="font-semibold text-blue-600">
                      {riscos.filter(r => r.status === 'aceitavel').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal para nova auditoria */}
      <dialog id="nova-auditoria" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Nova Auditoria</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tipo-auditoria">Tipo</Label>
                <Select 
                  value={novaAuditoria.tipo} 
                  onValueChange={(value) => setNovaAuditoria(prev => ({ ...prev, tipo: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="interna">Interna</SelectItem>
                    <SelectItem value="externa">Externa</SelectItem>
                    <SelectItem value="certificadora">Certificadora</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="setor-auditoria">Setor</Label>
                <Input
                  id="setor-auditoria"
                  value={novaAuditoria.setor}
                  onChange={(e) => setNovaAuditoria(prev => ({ ...prev, setor: e.target.value }))}
                  placeholder="Setor"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="responsavel-auditoria">Responsável</Label>
              <Input
                id="responsavel-auditoria"
                value={novaAuditoria.responsavel}
                onChange={(e) => setNovaAuditoria(prev => ({ ...prev, responsavel: e.target.value }))}
                placeholder="Nome do responsável"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="data-inicio-auditoria">Data Início</Label>
                <Input
                  id="data-inicio-auditoria"
                  type="date"
                  value={novaAuditoria.dataInicio}
                  onChange={(e) => setNovaAuditoria(prev => ({ ...prev, dataInicio: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="data-fim-auditoria">Data Fim</Label>
                <Input
                  id="data-fim-auditoria"
                  type="date"
                  value={novaAuditoria.dataFim}
                  onChange={(e) => setNovaAuditoria(prev => ({ ...prev, dataFim: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="descricao-auditoria">Descrição</Label>
              <Textarea
                id="descricao-auditoria"
                value={novaAuditoria.descricao}
                onChange={(e) => setNovaAuditoria(prev => ({ ...prev, descricao: e.target.value }))}
                placeholder="Descrição da auditoria"
                rows={3}
              />
            </div>
          </div>
          <div className="modal-action">
            <Button variant="outline" onClick={() => document.getElementById('nova-auditoria').close()}>
              Cancelar
            </Button>
            <Button onClick={() => {
              adicionarAuditoria();
              document.getElementById('nova-auditoria').close();
            }}>
              Adicionar Auditoria
            </Button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SistemaCompliance; 