
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { 
  colaboradoresData as initialColaboradoresData, 
  epiData,
  updateColaboradoresData
} from "@/lib/data";
import ColaboradorCard from "./ColaboradorCard";
import ColaboradorDetailsDialog from "./ColaboradorDetailsDialog";
import AddColaboradorDialog from "./AddColaboradorDialog";

const ColaboradoresList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedColaborador, setSelectedColaborador] = useState(null);
  const [colaboradores, setColaboradores] = useState(initialColaboradoresData);
  const { toast } = useToast();

  useEffect(() => {
    updateColaboradoresData(colaboradores);
  }, [colaboradores]);

  const filteredColaboradores = colaboradores.filter(colaborador => 
    colaborador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    colaborador.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    colaborador.setor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDetails = (colaborador) => {
    setSelectedColaborador(colaborador);
    setIsDetailsDialogOpen(true);
  };

  const handleAddColaborador = (novoColaborador) => {
    const novoId = colaboradores.length > 0 ? Math.max(...colaboradores.map(c => c.id)) + 1 : 1;
    const colaboradorComId = { ...novoColaborador, id: novoId };
    setColaboradores(prevColaboradores => [colaboradorComId, ...prevColaboradores]);
    toast({
      title: "Colaborador Adicionado",
      description: `${novoColaborador.nome} foi adicionado com sucesso.`,
    });
  };
  
  const handleUpdateColaborador = (colaboradorAtualizado) => {
    setColaboradores(prevColaboradores => 
      prevColaboradores.map(c => 
        c.id === colaboradorAtualizado.id ? colaboradorAtualizado : c
      )
    );
    setSelectedColaborador(colaboradorAtualizado);
    toast({
      title: "Colaborador Atualizado",
      description: `${colaboradorAtualizado.nome} foi atualizado com sucesso.`,
    });
  };

  const handleDeleteColaborador = (colaboradorId) => {
    setColaboradores(prevColaboradores => 
      prevColaboradores.filter(c => c.id !== colaboradorId)
    );
    setIsDetailsDialogOpen(false);
    setSelectedColaborador(null);
    toast({
      title: "Colaborador Excluído",
      description: `O colaborador foi excluído com sucesso.`,
      variant: "destructive"
    });
  };


  return (
    <div className="container py-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center justify-between"
      >
        <h1 className="text-3xl font-bold">Colaboradores</h1>
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          <span>Novo Colaborador</span>
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
            placeholder="Buscar por nome, cargo ou setor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredColaboradores.map((colaborador, index) => (
          <ColaboradorCard 
            key={colaborador.id} 
            colaborador={colaborador} 
            onOpenDetails={handleOpenDetails} 
            index={index}
          />
        ))}
        
        {filteredColaboradores.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <Users className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Nenhum colaborador encontrado</h3>
            <p className="text-sm text-muted-foreground">
              Tente ajustar sua busca ou cadastre um novo colaborador.
            </p>
          </div>
        )}
      </div>
      
      <ColaboradorDetailsDialog
        isOpen={isDetailsDialogOpen}
        onOpenChange={setIsDetailsDialogOpen}
        colaborador={selectedColaborador}
        epiData={epiData}
        onUpdateColaborador={handleUpdateColaborador}
        onDeleteColaborador={handleDeleteColaborador}
      />

      <AddColaboradorDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddColaborador={handleAddColaborador}
        epiData={epiData}
      />
    </div>
  );
};

export default ColaboradoresList;
