
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const AddOcorrenciaDialog = ({ isOpen, onOpenChange, onAddOcorrencia, tiposOcorrencia, gravidadeOptions }) => {
  const [novaOcorrencia, setNovaOcorrencia] = useState({
    tipo: "",
    descricao: "",
    data: "",
    hora: "",
    local: "",
    envolvidos: "",
    gravidade: "",
    medidasTomadas: "",
  });
  const { toast } = useToast();

  const validateNovaOcorrencia = () => {
    const requiredFields = [
      "tipo", "descricao", "data", "hora", "local", "envolvidos", "gravidade", "medidasTomadas"
    ];
    const emptyFields = requiredFields.filter(field => !novaOcorrencia[field]);
    if (emptyFields.length > 0) {
      toast({
        title: "Campos obrigatórios",
        description: `Por favor, preencha os seguintes campos: ${emptyFields.join(", ")}.`,
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateNovaOcorrencia()) return;
    onAddOcorrencia(novaOcorrencia);
    setNovaOcorrencia({
      tipo: "", descricao: "", data: "", hora: "", local: "", envolvidos: "", gravidade: "", medidasTomadas: "",
    });
    onOpenChange(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNovaOcorrencia(prev => ({ ...prev, [id]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Nova Ocorrência</DialogTitle>
          <DialogDescription>
            Preencha os dados da ocorrência de segurança
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          <div>
            <Label htmlFor="tipo">Tipo de Ocorrência</Label>
            <select
              id="tipo"
              value={novaOcorrencia.tipo}
              onChange={handleInputChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Selecione o tipo</option>
              {tiposOcorrencia.map((tipo) => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>
          
          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <textarea
              id="descricao"
              value={novaOcorrencia.descricao}
              onChange={handleInputChange}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Descreva detalhadamente o que aconteceu..."
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="data">Data</Label>
              <Input id="data" type="date" value={novaOcorrencia.data} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="hora">Hora</Label>
              <Input id="hora" type="time" value={novaOcorrencia.hora} onChange={handleInputChange} />
            </div>
          </div>
          
          <div>
            <Label htmlFor="local">Local</Label>
            <Input id="local" value={novaOcorrencia.local} onChange={handleInputChange} placeholder="Onde ocorreu o incidente?" />
          </div>
          
          <div>
            <Label htmlFor="envolvidos">Pessoas Envolvidas</Label>
            <Input id="envolvidos" value={novaOcorrencia.envolvidos} onChange={handleInputChange} placeholder="Nome das pessoas envolvidas" />
          </div>
          
          <div>
            <Label htmlFor="gravidade">Gravidade</Label>
            <select
              id="gravidade"
              value={novaOcorrencia.gravidade}
              onChange={handleInputChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Selecione a gravidade</option>
              {gravidadeOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <Label htmlFor="medidasTomadas">Medidas Tomadas</Label>
            <textarea
              id="medidasTomadas"
              value={novaOcorrencia.medidasTomadas}
              onChange={handleInputChange}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Quais medidas foram tomadas para resolver a situação?"
            />
          </div>
        </div>
        
        <DialogFooter className="pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Registrar Ocorrência
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddOcorrenciaDialog;
