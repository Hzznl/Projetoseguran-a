
import React, { useState } from "react";
import { PlusCircle, User, Briefcase, Building, Shield, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const AddColaboradorDialog = ({ isOpen, onOpenChange, onAddColaborador, epiData }) => {
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [setor, setSetor] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const [epiAssignados, setEpiAssignados] = useState([]);
  const { toast } = useToast();

  const resetForm = () => {
    setNome("");
    setCargo("");
    setSetor("");
    setFotoUrl("");
    setEpiAssignados([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !cargo || !setor) {
      toast({
        title: "Erro de Validação",
        description: "Nome, cargo e setor são obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    onAddColaborador({ nome, cargo, setor, fotoUrl, epiAssignados });
    resetForm();
    onOpenChange(false);
  };

  const handleEPIToggle = (epiId) => {
    setEpiAssignados(prev => 
      prev.includes(epiId) ? prev.filter(id => id !== epiId) : [...prev, epiId]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { onOpenChange(open); if (!open) resetForm(); }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PlusCircle className="h-6 w-6 text-primary" />
            Adicionar Novo Colaborador
          </DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para cadastrar um novo colaborador.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2 max-h-[60vh] overflow-y-auto pr-2">
          <div>
            <Label htmlFor="nome" className="flex items-center gap-1 mb-1"><User className="h-4 w-4"/>Nome Completo</Label>
            <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: João da Silva" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cargo" className="flex items-center gap-1 mb-1"><Briefcase className="h-4 w-4"/>Cargo</Label>
              <Input id="cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} placeholder="Ex: Operador de Máquinas" />
            </div>
            <div>
              <Label htmlFor="setor" className="flex items-center gap-1 mb-1"><Building className="h-4 w-4"/>Setor</Label>
              <Input id="setor" value={setor} onChange={(e) => setSetor(e.target.value)} placeholder="Ex: Produção" />
            </div>
          </div>

          <div>
            <Label htmlFor="fotoUrl" className="flex items-center gap-1 mb-1"><ImageIcon className="h-4 w-4"/>URL da Foto (Opcional)</Label>
            <Input id="fotoUrl" value={fotoUrl} onChange={(e) => setFotoUrl(e.target.value)} placeholder="https://exemplo.com/foto.jpg" />
          </div>
          
          <div>
            <Label className="flex items-center gap-1 mb-2"><Shield className="h-4 w-4"/>EPIs Designados</Label>
            <div className="space-y-2 rounded-md border p-3 max-h-48 overflow-y-auto bg-muted/30">
              {epiData.map((epi) => (
                <div key={epi.id} className="flex items-center justify-between">
                  <Label htmlFor={`epi-check-${epi.id}`} className="text-sm font-normal cursor-pointer">
                    {epi.nome} (CA: {epi.ca})
                  </Label>
                  <input 
                    type="checkbox"
                    id={`epi-check-${epi.id}`}
                    checked={epiAssignados.includes(epi.id)}
                    onChange={() => handleEPIToggle(epi.id)}
                    className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter className="pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => { onOpenChange(false); resetForm(); }}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Adicionar Colaborador
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddColaboradorDialog;
