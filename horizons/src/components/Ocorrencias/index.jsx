
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Search, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { getOcorrencias, saveOcorrencias, tiposOcorrencia, gravidadeOptions } from "@/lib/data";
import OcorrenciaCard from "./OcorrenciaCard";
import OcorrenciaDetailsDialog from "./OcorrenciaDetailsDialog";
import AddOcorrenciaDialog from "./AddOcorrenciaDialog";

const Ocorrencias = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedOcorrencia, setSelectedOcorrencia] = useState(null);
  const [ocorrencias, setOcorrenciasState] = useState(getOcorrencias());
  
  const { toast } = useToast();

  useEffect(() => {
    saveOcorrencias(ocorrencias);
  }, [ocorrencias]);

  const filteredOcorrencias = ocorrencias.filter(ocorrencia => 
    ocorrencia.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ocorrencia.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ocorrencia.local.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDetails = (ocorrencia) => {
    setSelectedOcorrencia(ocorrencia);
    setIsDetailsDialogOpen(true);
  };

  const handleDeleteOcorrencia = (ocorrenciaId) => {
    const updatedOcorrencias = ocorrencias.filter(o => o.id !== ocorrenciaId);
    setOcorrenciasState(updatedOcorrencias);
    setIsDetailsDialogOpen(false);
    setSelectedOcorrencia(null);
    toast({
      title: "Ocorrência excluída",
      description: "A ocorrência foi removida com sucesso.",
    });
  };

  const handleAddOcorrencia = (novaOcorrencia) => {
    const novaOcorrenciaCompleta = {
      id: Date.now(),
      ...novaOcorrencia,
      dataCriacao: new Date().toISOString(),
    };
    setOcorrenciasState([novaOcorrenciaCompleta, ...ocorrencias]);
    toast({
      title: "Ocorrência registrada",
      description: "A nova ocorrência foi registrada com sucesso.",
    });
  };

  return (
    <div className="container py-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center justify-between"
      >
        <h1 className="text-3xl font-bold">Registro de Ocorrências</h1>
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          <span>Nova Ocorrência</span>
        </Button>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por tipo, descrição ou local..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredOcorrencias.map((ocorrencia, index) => (
          <OcorrenciaCard 
            key={ocorrencia.id} 
            ocorrencia={ocorrencia} 
            onOpenDetails={handleOpenDetails} 
            index={index}
            gravidadeOptions={gravidadeOptions}
          />
        ))}
        
        {filteredOcorrencias.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Nenhuma ocorrência encontrada</h3>
            <p className="text-sm text-muted-foreground">
              Registre uma nova ocorrência ou ajuste seus filtros de busca.
            </p>
          </div>
        )}
      </div>
      
      <OcorrenciaDetailsDialog
        isOpen={isDetailsDialogOpen}
        onOpenChange={setIsDetailsDialogOpen}
        ocorrencia={selectedOcorrencia}
        onDelete={handleDeleteOcorrencia}
        gravidadeOptions={gravidadeOptions}
      />

      <AddOcorrenciaDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddOcorrencia={handleAddOcorrencia}
        tiposOcorrencia={tiposOcorrencia}
        gravidadeOptions={gravidadeOptions}
      />
    </div>
  );
};

export default Ocorrencias;
