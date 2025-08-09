import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { useToast } from '../ui/use-toast';
import { AlertTriangle, Upload, Plus, X } from 'lucide-react';

const PGRForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    setor: '',
    atividade: '',
    perigo: '',
    risco: '',
    tipoRisco: '',
    classificacao: '',
    medidasExistentes: '',
    medidasPropostas: '',
    evidencias: []
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const setores = [
    'Produção', 'Manutenção', 'Administrativo', 'Logística', 
    'Qualidade', 'RH', 'TI', 'Financeiro'
  ];

  const tiposRisco = [
    'Físico', 'Químico', 'Biológico', 'Ergonômico', 'Mecânico'
  ];

  const classificacoes = [
    { value: 'baixo', label: 'Baixo Risco', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
    { value: 'medio', label: 'Médio Risco', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
    { value: 'alto', label: 'Alto Risco', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newEvidencias = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      size: file.size,
      file: file
    }));
    
    setFormData(prev => ({
      ...prev,
      evidencias: [...prev.evidencias, ...newEvidencias]
    }));
  };

  const removeEvidencia = (id) => {
    setFormData(prev => ({
      ...prev,
      evidencias: prev.evidencias.filter(ev => ev.id !== id)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.setor || !formData.atividade || !formData.perigo || !formData.risco) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Simular salvamento
    console.log('Dados do PGR:', formData);
    
    toast({
      title: "Risco cadastrado com sucesso! 🛡️",
      description: `Risco "${formData.risco}" foi adicionado ao PGR.`,
      variant: "success",
    });

    // Limpar formulário
    setFormData({
      setor: '',
      atividade: '',
      perigo: '',
      risco: '',
      tipoRisco: '',
      classificacao: '',
      medidasExistentes: '',
      medidasPropostas: '',
      evidencias: []
    });
    
    setIsExpanded(false);
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <AlertTriangle className="h-5 w-5" />
          Cadastrar Novo Risco
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campos básicos sempre visíveis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="tipoRisco" className="text-card-foreground">Tipo de Risco *</Label>
              <Select value={formData.tipoRisco} onValueChange={(value) => handleInputChange('tipoRisco', value)}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tiposRisco.map(tipo => (
                    <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="atividade" className="text-card-foreground">Atividade *</Label>
            <Input
              id="atividade"
              value={formData.atividade}
              onChange={(e) => handleInputChange('atividade', e.target.value)}
              placeholder="Descreva a atividade realizada"
              className="bg-background border-border text-card-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="perigo" className="text-card-foreground">Perigo Identificado *</Label>
            <Input
              id="perigo"
              value={formData.perigo}
              onChange={(e) => handleInputChange('perigo', e.target.value)}
              placeholder="Descreva o perigo identificado"
              className="bg-background border-border text-card-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="risco" className="text-card-foreground">Risco *</Label>
            <Input
              id="risco"
              value={formData.risco}
              onChange={(e) => handleInputChange('risco', e.target.value)}
              placeholder="Descreva o risco associado"
              className="bg-background border-border text-card-foreground"
            />
          </div>

          {/* Botão para expandir campos adicionais */}
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full border-border"
          >
            {isExpanded ? (
              <>
                <X className="h-4 w-4 mr-2" />
                Ocultar campos adicionais
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar campos detalhados
              </>
            )}
          </Button>

          {/* Campos adicionais */}
          {isExpanded && (
            <div className="space-y-6 border-t border-border pt-6">
              <div className="space-y-2">
                <Label htmlFor="classificacao" className="text-card-foreground">Classificação do Risco</Label>
                <Select value={formData.classificacao} onValueChange={(value) => handleInputChange('classificacao', value)}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Selecione a classificação" />
                  </SelectTrigger>
                  <SelectContent>
                    {classificacoes.map(classif => (
                      <SelectItem key={classif.value} value={classif.value}>
                        <div className="flex items-center gap-2">
                          <Badge className={classif.color}>{classif.label}</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="medidasExistentes" className="text-card-foreground">Medidas de Controle Existentes</Label>
                <Textarea
                  id="medidasExistentes"
                  value={formData.medidasExistentes}
                  onChange={(e) => handleInputChange('medidasExistentes', e.target.value)}
                  placeholder="Descreva as medidas de controle já implementadas"
                  rows={3}
                  className="bg-background border-border text-card-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medidasPropostas" className="text-card-foreground">Medidas de Controle Propostas</Label>
                <Textarea
                  id="medidasPropostas"
                  value={formData.medidasPropostas}
                  onChange={(e) => handleInputChange('medidasPropostas', e.target.value)}
                  placeholder="Descreva as medidas de controle que devem ser implementadas"
                  rows={3}
                  className="bg-background border-border text-card-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-card-foreground">Evidências (Imagens/Documentos)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Arraste arquivos aqui ou clique para selecionar
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Button type="button" variant="outline" size="sm" className="border-border">
                      Selecionar Arquivos
                    </Button>
                  </label>
                </div>

                {/* Lista de evidências */}
                {formData.evidencias.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-card-foreground">Arquivos selecionados:</Label>
                    <div className="space-y-2">
                      {formData.evidencias.map(evidencia => (
                        <div key={evidencia.id} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm text-card-foreground">{evidencia.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeEvidencia(evidencia.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              <Plus className="h-4 w-4 mr-2" />
              Cadastrar Risco
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsExpanded(false)} className="border-border">
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PGRForm; 