import { pgrData } from '@/lib/data/pgr-data';
import { Download, Edit, Eye, Search, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useToast } from '../ui/use-toast';

const PGRList = () => {
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    search: '',
    setor: 'all',
    tipoRisco: 'all',
    classificacao: 'all'
  });

  // Usar dados reais do pgr-data.js
  const riscos = pgrData.riscos;
  const setores = pgrData.setores;
  const tiposRisco = pgrData.tiposRisco;
  const classificacoes = pgrData.classificacoes;

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredRiscos = riscos.filter(risco => {
    const searchMatch = !filters.search || 
      risco.atividade.toLowerCase().includes(filters.search.toLowerCase()) ||
      risco.perigo.toLowerCase().includes(filters.search.toLowerCase()) ||
      risco.risco.toLowerCase().includes(filters.search.toLowerCase());
    
    const setorMatch = filters.setor === 'all' || risco.setor === filters.setor;
    const tipoMatch = filters.tipoRisco === 'all' || risco.tipoRisco === filters.tipoRisco;
    const classificacaoMatch = filters.classificacao === 'all' || risco.classificacao === filters.classificacao;

    return searchMatch && setorMatch && tipoMatch && classificacaoMatch;
  });

  const getClassificacaoColor = (classificacao) => {
    const classif = classificacoes.find(c => c.value === classificacao);
    return classif ? classif.color : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  };

  const getClassificacaoLabel = (classificacao) => {
    const classif = classificacoes.find(c => c.value === classificacao);
    return classif ? classif.label : 'Não definido';
  };

  const handleExportPDF = () => {
    toast({
      title: "Relatório PGR gerado! 📄",
      description: "O relatório foi baixado com sucesso.",
      variant: "success",
    });
  };

  const handleViewRisco = (risco) => {
    toast({
      title: "Visualizando risco",
      description: `Risco: ${risco.risco}`,
    });
  };

  const handleEditRisco = (risco) => {
    toast({
      title: "Editando risco",
      description: `Editando: ${risco.risco}`,
    });
  };

  const handleDeleteRisco = (risco) => {
    toast({
      title: "Risco removido",
      description: `Risco "${risco.risco}" foi removido do PGR.`,
      variant: "destructive",
    });
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-card-foreground">
          <span>Riscos Cadastrados</span>
          <Button onClick={handleExportPDF} size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar PGR
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar riscos..."
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

          <Select value={filters.tipoRisco} onValueChange={(value) => handleFilterChange('tipoRisco', value)}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Tipos</SelectItem>
              {tiposRisco.map(tipo => (
                <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.classificacao} onValueChange={(value) => handleFilterChange('classificacao', value)}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Filtrar por classificação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Classificações</SelectItem>
              {classificacoes.map(classif => (
                <SelectItem key={classif.value} value={classif.value}>
                  {classif.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Lista de riscos */}
        <div className="space-y-4">
          {filteredRiscos.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum risco encontrado com os filtros aplicados.
            </div>
          ) : (
            filteredRiscos.map(risco => (
              <div key={risco.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors bg-card">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-card-foreground">{risco.atividade}</h3>
                      <Badge className={getClassificacaoColor(risco.classificacao)}>
                        {getClassificacaoLabel(risco.classificacao)}
                      </Badge>
                      <Badge variant="outline" className="border-border text-card-foreground">{risco.tipoRisco}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-muted-foreground">Setor:</p>
                        <p className="text-card-foreground">{risco.setor}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Perigo:</p>
                        <p className="text-card-foreground">{risco.perigo}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="font-medium text-muted-foreground">Risco:</p>
                        <p className="text-card-foreground">{risco.risco}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Medidas Existentes:</p>
                        <p className="text-card-foreground">{risco.medidasExistentes}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Medidas Propostas:</p>
                        <p className="text-card-foreground">{risco.medidasPropostas}</p>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-xs text-muted-foreground">
                      Cadastrado em: {new Date(risco.dataCadastro).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewRisco(risco)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditRisco(risco)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteRisco(risco)}
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
  );
};

export default PGRList; 