import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Briefcase,
  Building,
  Edit,
  Save,
  Shield,
  Trash2,
  User,
  X
} from "lucide-react";
import React, { useEffect, useState } from "react";

const EPIStatusBadgeDialog = ({ status }) => {
  let variant = "outline";
  let text = status;
  if (status === "válido") { variant = "success"; text = "Válido"; }
  else if (status === "próximo do vencimento") { variant = "warning"; text = "Perto de Vencer"; }
  else if (status === "vencido") { variant = "destructive"; text = "Vencido"; }
  
  return <Badge variant={variant} className="capitalize">{text}</Badge>;
};

const ColaboradorDetailsDialog = ({ isOpen, onOpenChange, colaborador, epiData, onUpdateColaborador, onDeleteColaborador }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedColaborador, setEditedColaborador] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    if (colaborador) {
      setEditedColaborador(colaborador);
    }
  }, [colaborador]);

  if (!colaborador || !editedColaborador) return null;

  const getEPIsColaborador = (colab) => {
    return colab.epiAssignados.map(epiId => {
      const epi = epiData.find(e => e.id === epiId);
      if (!epi) return null;
      
      let status = "indefinido";
      const today = new Date();
      const validadeDate = new Date(epi.validade);
      const diffTime = validadeDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 0) {
        status = "vencido";
      } else if (diffDays <= 30) {
        status = "próximo do vencimento";
      } else {
        status = "válido";
      }
      return {...epi, status};
    }).filter(Boolean);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedColaborador(prev => ({ ...prev, [name]: value }));
  };

  const handleEPIToggle = (epiId) => {
    setEditedColaborador(prev => {
      const epiAssignados = prev.epiAssignados.includes(epiId)
        ? prev.epiAssignados.filter(id => id !== epiId)
        : [...prev.epiAssignados, epiId];
      return { ...prev, epiAssignados };
    });
  };
  
  const handleSaveChanges = () => {
    onUpdateColaborador(editedColaborador);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDeleteColaborador(colaborador.id);
  };

  const allEPIs = epiData;

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { onOpenChange(open); if (!open) setIsEditing(false); }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Colaborador" : editedColaborador.nome}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Modifique os dados do colaborador." : "Detalhes do colaborador e seus EPIs."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2 max-h-[60vh] overflow-y-auto pr-2">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-primary/30">
              <AvatarImage src={editedColaborador.fotoUrl || ""} alt={editedColaborador.nome} />
              <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-primary/80 to-secondary/80 text-primary-foreground">
                {getInitials(editedColaborador.nome)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              {isEditing ? (
                <>
                  <Input name="nome" value={editedColaborador.nome} onChange={handleInputChange} placeholder="Nome completo" className="mb-2"/>
                  <Input name="fotoUrl" value={editedColaborador.fotoUrl || ""} onChange={handleInputChange} placeholder="URL da Foto (opcional)" />
                </>
              ) : (
                <h3 className="text-xl font-semibold text-primary">{editedColaborador.nome}</h3>
              )}
            </div>
          </div>

          {isEditing ? (
            <div className="grid grid-cols-2 gap-4">
              <div><Label htmlFor="cargo">Cargo</Label><Input id="cargo" name="cargo" value={editedColaborador.cargo} onChange={handleInputChange} /></div>
              <div><Label htmlFor="setor">Setor</Label><Input id="setor" name="setor" value={editedColaborador.setor} onChange={handleInputChange} /></div>
              <div><Label htmlFor="id">ID</Label><Input id="id" name="id" value={editedColaborador.id} disabled /></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-muted-foreground" /><span>{editedColaborador.cargo}</span></div>
              <div className="flex items-center gap-2"><Building className="h-4 w-4 text-muted-foreground" /><span>{editedColaborador.setor}</span></div>
              <div className="flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground" /><span>ID: {editedColaborador.id}</span></div>
            </div>
          )}
          
          <div className="rounded-md border p-3 bg-muted/20">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-primary" />
              <h4 className="font-medium text-primary">EPIs Designados</h4>
            </div>
            <div className="space-y-2">
              {isEditing ? (
                (allEPIs && allEPIs.length > 0 ? allEPIs : []).map((epi) => (
                  <label
                    key={epi.id}
                    className="flex items-center justify-between rounded-md bg-background p-2 border cursor-pointer"
                  >
                    <span className="text-sm flex-1">
                      {epi.nome ? `${epi.nome} (CA: ${epi.ca})` : `EPI #${epi.id} (CA: ${epi.ca})`}
                    </span>
                    <input
                      type="checkbox"
                      checked={editedColaborador.epiAssignados.includes(epi.id)}
                      onChange={() => handleEPIToggle(epi.id)}
                      className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary"
                    />
                  </label>
                ))
              ) : (
                getEPIsColaborador(editedColaborador).length > 0 ? (
                  getEPIsColaborador(editedColaborador).map((epi) => (
                    <div key={epi.id} className="flex items-center justify-between rounded-md bg-background p-2 border">
                      <span className="text-sm">{epi.nome ? epi.nome : `EPI #${epi.id}`}</span>
                      <div className="flex items-center gap-2">
                        <EPIStatusBadgeDialog status={epi.status} />
                        <span className="text-xs text-muted-foreground">CA: {epi.ca}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-2">Nenhum EPI designado.</p>
                )
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter className="pt-4 border-t">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => { setIsEditing(false); setEditedColaborador(colaborador); }} className="gap-1">
                <X className="h-4 w-4" /> Cancelar
              </Button>
              <Button onClick={handleSaveChanges} className="gap-1 bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4" /> Salvar Alterações
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditing(true)} className="gap-1">
                <Edit className="h-4 w-4" /> Editar
              </Button>
              <Button variant="destructive" onClick={handleDelete} className="gap-1">
                <Trash2 className="h-4 w-4" /> Excluir
              </Button>
              <Button onClick={() => onOpenChange(false)}>Fechar</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ColaboradorDetailsDialog;
