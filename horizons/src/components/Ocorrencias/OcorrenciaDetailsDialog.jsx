
import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { User, Shield, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const OcorrenciaDetailsDialog = ({ isOpen, onOpenChange, ocorrencia, onDelete, gravidadeOptions }) => {
  const { toast } = useToast();

  if (!ocorrencia) return null;

  const getGravidadeBadge = (gravidade) => {
    const option = gravidadeOptions.find(opt => opt.value === gravidade);
    return (
      <Badge 
        variant="outline" 
        className={`${option?.color} text-white border-none`}
      >
        {option?.label}
      </Badge>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{ocorrencia.tipo}</span>
            {getGravidadeBadge(ocorrencia.gravidade)}
          </DialogTitle>
          <DialogDescription>
            Detalhes da ocorrência registrada em {format(new Date(ocorrencia.dataCriacao), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="rounded-lg bg-muted p-4">
            <h4 className="font-medium mb-2">Descrição da Ocorrência</h4>
            <p className="text-sm text-muted-foreground">{ocorrencia.descricao}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs">Data</Label>
              <p className="font-medium">{format(new Date(ocorrencia.data), "dd/MM/yyyy")}</p>
            </div>
            <div>
              <Label className="text-xs">Hora</Label>
              <p className="font-medium">{ocorrencia.hora}</p>
            </div>
            <div className="col-span-2">
              <Label className="text-xs">Local</Label>
              <p className="font-medium">{ocorrencia.local}</p>
            </div>
          </div>
          
          <div>
            <Label className="text-xs">Pessoas Envolvidas</Label>
            <div className="mt-1 rounded-md border p-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{ocorrencia.envolvidos}</p>
              </div>
            </div>
          </div>
          
          <div>
            <Label className="text-xs">Medidas Tomadas</Label>
            <div className="mt-1 rounded-md border p-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{ocorrencia.medidasTomadas}</p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="gap-2 sm:gap-0 pt-4 border-t">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => {
                toast({
                  title: "Funcionalidade em desenvolvimento",
                  description: "A edição de ocorrências estará disponível em breve.",
                });
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              className="text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(ocorrencia.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OcorrenciaDetailsDialog;
