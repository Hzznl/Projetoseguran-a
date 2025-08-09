import { planoAcaoData } from '@/lib/data/plano-acao-data';
import { AlertTriangle, CheckCircle, Clock, Download, Edit, Eye, Search, Star, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useToast } from '../ui/use-toast';

const PlanoAcaoList = () => {
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    search: '',
    setor: 'all',
    status: 'all',
    prioridade: 'all',
    responsavel: 'all'
  });

  const [showEficaciaModal, setShowEficaciaModal] = useState(false);
  const [selectedAcao, setSelectedAcao] = useState(null);

  // Usar dados reais do plano-acao-data.js
  const acoes = planoAcaoData.acoes;
  const setores = planoAcaoData.setores;
  const responsaveis = planoAcaoData.responsaveis;
  const statusOptions = planoAcaoData.statusOptions;
  const prioridades = planoAcaoData.prioridades;

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredAcoes = acoes.filter(acao => {
    const searchMatch = !filters.search || 
      acao.titulo.toLowerCase().includes(filters.search.toLowerCase()) ||
      acao.descricao.toLowerCase().includes(filters.search.toLowerCase());
    
    const setorMatch = filters.setor === 'all' || acao.setor === filters.setor;
    const statusMatch = filters.status === 'all' || acao.status === filters.status;
    const prioridadeMatch = filters.prioridade === 'all' || acao.prioridade === filters.prioridade;
    const responsavelMatch = filters.responsavel === 'all' || acao.responsavel === filters.responsavel;

    return searchMatch && setorMatch && statusMatch && prioridadeMatch && responsavelMatch;
  });

  const getStatusColor = (status) => {
    const statusOpt = statusOptions.find(s => s.value === status);
    return statusOpt ? statusOpt.color : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  };

  const getStatusLabel = (status) => {
    const statusOpt = statusOptions.find(s => s.value === status);
    return statusOpt ? statusOpt.label : 'Não definido';
  };

  const getPrioridadeColor = (prioridade) => {
    const prior = prioridades.find(p => p.value === prioridade);
    return prior ? prior.color : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  };

  const getPrioridadeLabel = (prioridade) => {
    const prior = prioridades.find(p => p.value === prioridade);
    return prior ? prior.label : 'Não definido';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pendente': return <Clock className="h-4 w-4" />;
      case 'em_andamento': return <AlertTriangle className="h-4 w-4" />;
      case 'concluida': return <CheckCircle className="h-4 w-4" />;
      case 'atrasada': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const isAtrasada = (acao) => {
    if (acao.status === 'concluida') return false;
    const hoje = new Date();
    const prazo = new Date(acao.prazo);
    return hoje > prazo;
  };

  const handleExportPDF = () => {
    toast({
      title: "Relatório do Plano de Ação gerado! 📄",
      description: "O relatório foi baixado com sucesso.",
      variant: "success",
    });
  };

  const handleViewAcao = (acao) => {
    toast({
      title: "Visualizando ação",
      description: `Ação: ${acao.titulo}`,
    });
  };

  const handleEditAcao = (acao) => {
    toast({
      title: "Editando ação",
      description: `Editando: ${acao.titulo}`,
    });
  };

  const handleDeleteAcao = (acao) => {
    toast({
      title: "Ação removida",
      description: `Ação "${acao.titulo}" foi removida do Plano de Ação.`,
      variant: "destructive",
    });
  };

  const handleAvaliarEficacia = (acao) => {
    setSelectedAcao(acao);
    setShowEficaciaModal(true);
  };

  const handleSubmitEficacia = (nota, observacao) => {
    toast({
      title: "Eficácia avaliada! ⭐",
      description: `Ação "${selectedAcao.titulo}" recebeu nota ${nota}/5.`,
      variant: "success",
    });
    setShowEficaciaModal(false);
    setSelectedAcao(null);
  };

  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-card-foreground">
            <span>Ações do Plano</span>
            <Button onClick={handleExportPDF} size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar Relatório
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar ações..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10 bg-background border-border text-card-foreground"
              />
            </div>
            
            <Select value={filters.setor} onValueChange={(value) => handleFilterChange('setor', value)}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Filtrar por setor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Setores</SelectItem>
                {setores.map(setor => (
                  <SelectItem key={setor} value={setor}>{setor}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                {statusOptions.map(status => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.prioridade} onValueChange={(value) => handleFilterChange('prioridade', value)}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Filtrar por prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Prioridades</SelectItem>
                {prioridades.map(prior => (
                  <SelectItem key={prior.value} value={prior.value}>
                    {prior.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.responsavel} onValueChange={(value) => handleFilterChange('responsavel', value)}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Filtrar por responsável" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Responsáveis</SelectItem>
                {responsaveis.map(resp => (
                  <SelectItem key={resp} value={resp}>{resp}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Lista de ações */}
          <div className="space-y-4">
            {filteredAcoes.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma ação encontrada com os filtros aplicados.
              </div>
            ) : (
              filteredAcoes.map(acao => (
                <div key={acao.id} className={`border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors bg-card ${
                  isAtrasada(acao) ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20' : ''
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-card-foreground">{acao.titulo}</h3>
                        <Badge className={getStatusColor(acao.status)}>
                          {getStatusIcon(acao.status)}
                          <span className="ml-1">{getStatusLabel(acao.status)}</span>
                        </Badge>
                        <Badge className={getPrioridadeColor(acao.prioridade)}>
                          {getPrioridadeLabel(acao.prioridade)}
                        </Badge>
                        {isAtrasada(acao) && (
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                            ATRASADA
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{acao.descricao}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-muted-foreground">Setor:</p>
                          <p className="text-card-foreground">{acao.setor}</p>
                        </div>
                        <div>
                          <p className="font-medium text-muted-foreground">Responsável:</p>
                          <p className="text-card-foreground">{acao.responsavel}</p>
                        </div>
                        <div>
                          <p className="font-medium text-muted-foreground">Prazo:</p>
                          <p className={isAtrasada(acao) ? 'text-red-600 dark:text-red-400 font-medium' : 'text-card-foreground'}>
                            {new Date(acao.prazo).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-muted-foreground">Custo Estimado:</p>
                          <p className="text-card-foreground">R$ {acao.custoEstimado.toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Barra de progresso */}
                      {acao.status !== 'pendente' && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-card-foreground">Progresso</span>
                            <span className="text-card-foreground">{acao.progresso}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${acao.progresso}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Avaliação de eficácia */}
                      {acao.status === 'concluida' && (
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-sm font-medium text-card-foreground">Eficácia:</span>
                          {acao.eficacia ? (
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${
                                    i < acao.eficacia / 20 
                                      ? 'text-yellow-500 fill-current' 
                                      : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                              <span className="text-sm text-muted-foreground ml-1">
                                ({acao.eficacia}%)
                              </span>
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleAvaliarEficacia(acao)}
                              className="border-border"
                            >
                              <Star className="h-4 w-4 mr-1" />
                              Avaliar Eficácia
                            </Button>
                          )}
                        </div>
                      )}
                      
                      <div className="mt-2 text-xs text-muted-foreground">
                        Tipo: {acao.tipoAcao} | Risco: {acao.riscoRelacionado}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewAcao(acao)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditAcao(acao)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteAcao(acao)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal de avaliação de eficácia */}
      {showEficaciaModal && selectedAcao && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4 text-card-foreground">Avaliar Eficácia da Ação</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {selectedAcao.titulo}
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-card-foreground">Nota (1-5):</label>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((nota) => (
                    <button
                      key={nota}
                      className="text-2xl hover:text-yellow-500 transition-colors"
                      onClick={() => handleSubmitEficacia(nota * 20, '')}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowEficaciaModal(false)}
                  variant="outline"
                  className="flex-1 border-border"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlanoAcaoList; 