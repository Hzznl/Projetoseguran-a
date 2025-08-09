import { Plus, Target } from 'lucide-react';
import React, { useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';

const PlanoAcaoForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    setor: '',
    responsavel: '',
    prioridade: '',
    prazo: '',
    tipoAcao: '',
    riscoRelacionado: '',
    custoEstimado: '',
    observacoes: ''
  });

  const setores = [
    'Produção', 'Manutenção', 'Administrativo', 'Logística', 
    'Qualidade', 'RH', 'TI', 'Financeiro'
  ];

  const responsaveis = [
    'João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa',
    'Carlos Ferreira', 'Lucia Rodrigues', 'Roberto Almeida'
  ];

  const prioridades = [
    { value: 'alta', label: 'Alta', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
    { value: 'media', label: 'Média', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
    { value: 'baixa', label: 'Baixa', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' }
  ];

  const tiposAcao = [
    'Corretiva', 'Preventiva', 'Melhoria', 'Emergencial'
  ];

  const riscosRelacionados = [
    'Lesão por contato com partes móveis',
    'Lesão grave por queda',
    'Lesão por esforço repetitivo',
    'Intoxicação ou queimadura',
    'Exposição a ruído excessivo',
    'Exposição a vibrações'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.titulo || !formData.descricao || !formData.setor || !formData.responsavel || !formData.prazo) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Simular salvamento
    console.log('Dados da Ação:', formData);
    
    toast({
      title: "Ação cadastrada com sucesso! ✅",
      description: `Ação "${formData.titulo}" foi adicionada ao Plano de Ação.`,
      variant: "success",
    });

    // Limpar formulário
    setFormData({
      titulo: '',
      descricao: '',
      setor: '',
      responsavel: '',
      prioridade: '',
      prazo: '',
      tipoAcao: '',
      riscoRelacionado: '',
      custoEstimado: '',
      observacoes: ''
    });
  };

  const getPrioridadeColor = (prioridade) => {
    const prior = prioridades.find(p => p.value === prioridade);
    return prior ? prior.color : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <Target className="h-5 w-5" />
          Cadastrar Nova Ação
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="titulo" className="text-card-foreground">Título da Ação *</Label>
              <Input
                id="titulo"
                value={formData.titulo}
                onChange={(e) => handleInputChange('titulo', e.target.value)}
                placeholder="Ex: Instalação de proteções nas máquinas"
                className="bg-background border-border text-card-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipoAcao" className="text-card-foreground">Tipo de Ação</Label>
              <Select value={formData.tipoAcao} onValueChange={(value) => handleInputChange('tipoAcao', value)}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tiposAcao.map(tipo => (
                    <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao" className="text-card-foreground">Descrição da Ação *</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => handleInputChange('descricao', e.target.value)}
              placeholder="Descreva detalhadamente a ação a ser executada"
              rows={3}
              className="bg-background border-border text-card-foreground"
            />
          </div>

          {/* Responsabilidade e prazo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="setor" className="text-card-foreground">Setor *</Label>
              <Select value={formData.setor} onValueChange={(value) => handleInputChange('setor', value)}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Selecione o setor" />
                </SelectTrigger>
                <SelectContent>
                  {setores.map(setor => (
                    <SelectItem key={setor} value={setor}>{setor}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsavel" className="text-card-foreground">Responsável *</Label>
              <Select value={formData.responsavel} onValueChange={(value) => handleInputChange('responsavel', value)}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Selecione o responsável" />
                </SelectTrigger>
                <SelectContent>
                  {responsaveis.map(resp => (
                    <SelectItem key={resp} value={resp}>{resp}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prazo" className="text-card-foreground">Prazo *</Label>
              <Input
                id="prazo"
                type="date"
                value={formData.prazo}
                onChange={(e) => handleInputChange('prazo', e.target.value)}
                className="bg-background border-border text-card-foreground"
              />
            </div>
          </div>

          {/* Prioridade e risco relacionado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prioridade" className="text-card-foreground">Prioridade</Label>
              <Select value={formData.prioridade} onValueChange={(value) => handleInputChange('prioridade', value)}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  {prioridades.map(prior => (
                    <SelectItem key={prior.value} value={prior.value}>
                      <div className="flex items-center gap-2">
                        <Badge className={prior.color}>{prior.label}</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="riscoRelacionado" className="text-card-foreground">Risco Relacionado</Label>
              <Select value={formData.riscoRelacionado} onValueChange={(value) => handleInputChange('riscoRelacionado', value)}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Selecione o risco" />
                </SelectTrigger>
                <SelectContent>
                  {riscosRelacionados.map(risco => (
                    <SelectItem key={risco} value={risco}>{risco}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Custo estimado */}
          <div className="space-y-2">
            <Label htmlFor="custoEstimado" className="text-card-foreground">Custo Estimado (R$)</Label>
            <Input
              id="custoEstimado"
              type="number"
              value={formData.custoEstimado}
              onChange={(e) => handleInputChange('custoEstimado', e.target.value)}
              placeholder="0,00"
              step="0.01"
              min="0"
              className="bg-background border-border text-card-foreground"
            />
          </div>

          {/* Observações */}
          <div className="space-y-2">
            <Label htmlFor="observacoes" className="text-card-foreground">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => handleInputChange('observacoes', e.target.value)}
              placeholder="Observações adicionais sobre a ação"
              rows={2}
              className="bg-background border-border text-card-foreground"
            />
          </div>

          {/* Preview da ação */}
          {formData.titulo && (
            <div className="border border-border rounded-lg p-4 bg-muted/30">
              <h4 className="font-semibold mb-2 text-card-foreground">Preview da Ação:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-card-foreground">Título:</span>
                  <span className="text-card-foreground">{formData.titulo}</span>
                </div>
                {formData.setor && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-card-foreground">Setor:</span>
                    <span className="text-card-foreground">{formData.setor}</span>
                  </div>
                )}
                {formData.responsavel && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-card-foreground">Responsável:</span>
                    <span className="text-card-foreground">{formData.responsavel}</span>
                  </div>
                )}
                {formData.prazo && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-card-foreground">Prazo:</span>
                    <span className="text-card-foreground">{new Date(formData.prazo).toLocaleDateString()}</span>
                  </div>
                )}
                {formData.prioridade && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-card-foreground">Prioridade:</span>
                    <Badge className={getPrioridadeColor(formData.prioridade)}>
                      {prioridades.find(p => p.value === formData.prioridade)?.label}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              <Plus className="h-4 w-4 mr-2" />
              Cadastrar Ação
            </Button>
            <Button type="button" variant="outline" className="border-border">
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PlanoAcaoForm; 