import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { epiData as defaultEpiData, loadEpiData, updateEpiData } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle, Edit2, Eye, Plus, Search, Shield, Trash2, XCircle, FileText, Download, BarChart3, TrendingUp, Brain, Moon, Sun, Filter } from "lucide-react";
import React, { useEffect, useState } from "react";
import AnalisePreditiva from "./AnalisePreditiva";
import RelatoriosAvancados from "./RelatoriosAvancados";
import FiltrosAvancados from "./FiltrosAvancados";

// Componente para modo escuro/claro
const ThemeToggle = ({ isDark, onToggle }) => (
  <Button variant="outline" size="sm" onClick={onToggle} className="gap-2">
    {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    {isDark ? "Modo Claro" : "Modo Escuro"}
  </Button>
);

const EPIStatusBadge = ({ status }) => {
  if (status === "válido") {
    return <Badge variant="success" className="gap-1 bg-green-500 text-white hover:bg-green-600"><CheckCircle className="h-3 w-3" /> Válido</Badge>;
  }
  if (status === "próximo do vencimento") {
    return <Badge variant="warning" className="gap-1 bg-orange-600 text-white hover:bg-orange-700"><AlertTriangle className="h-3 w-3" /> Perto de Vencer</Badge>;
  }
  if (status === "vencido") {
    return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" /> Vencido</Badge>;
  }
  return <Badge variant="outline">{status}</Badge>;
};

const EPIsListMelhorado = () => {
  const [epis, setEpis] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEPI, setCurrentEPI] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("lista");
  const { toast } = useToast();

  // Filtros avançados
  const [filters, setFilters] = useState({
    status: "",
    tipo: "",
    vencimento: "",
    fabricante: "",
    search: ""
  });

  const [showFilters, setShowFilters] = useState(false);

  // Carregar dados originais
  useEffect(() => {
    localStorage.removeItem("epiDataSafety");
    const originalData = loadEpiData();
    setEpis(originalData);
  }, []);

  useEffect(() => {
    if (epis.length > 0) {
      updateEpiData(epis);
    }
  }, [epis]);

  // Aplicar filtros
  const filteredEpis = epis.filter(epi => {
    const matchesSearch = !filters.search || 
      epi.nome.toLowerCase().includes(filters.search.toLowerCase()) ||
      epi.tipo.toLowerCase().includes(filters.search.toLowerCase()) ||
      epi.ca.includes(filters.search) ||
      epi.fabricante.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = !filters.status || epi.status === filters.status;
    const matchesTipo = !filters.tipo || epi.tipo === filters.tipo;
    const matchesFabricante = !filters.fabricante || epi.fabricante.toLowerCase().includes(filters.fabricante.toLowerCase());
    
    let matchesVencimento = true;
    if (filters.vencimento) {
      const hoje = new Date();
      const dataValidade = new Date(epi.validade);
      const diffDays = Math.ceil((dataValidade - hoje) / (1000 * 60 * 60 * 24));
      
      switch (filters.vencimento) {
        case "7dias":
          matchesVencimento = diffDays <= 7 && diffDays > 0;
          break;
        case "30dias":
          matchesVencimento = diffDays <= 30 && diffDays > 0;
          break;
        case "90dias":
          matchesVencimento = diffDays <= 90 && diffDays > 0;
          break;
        case "vencido":
          matchesVencimento = diffDays < 0;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesTipo && matchesFabricante && matchesVencimento;
  });

  const resetToOriginalData = () => {
    localStorage.removeItem("epiDataSafety");
    const originalData = loadEpiData();
    setEpis(originalData);
    toast({ 
      title: "Dados Resetados", 
      description: "Dados originais foram carregados." 
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEPI(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEPI = (e) => {
    e.preventDefault();
    if (!currentEPI.nome || !currentEPI.tipo || !currentEPI.ca || !currentEPI.fabricante || !currentEPI.validade) {
      toast({ title: "Erro", description: "Todos os campos são obrigatórios.", variant: "destructive" });
      return;
    }
    if (currentEPI.ca.length !== 5 || !/^\d+$/.test(currentEPI.ca)) {
      toast({ title: "Erro", description: "CA deve ter 5 dígitos numéricos.", variant: "destructive" });
      return;
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataValidade = new Date(currentEPI.validade);
    let status = "válido";
    let mensagem = "CA válido";
    const diffTime = dataValidade - hoje;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (dataValidade < hoje) {
      status = "vencido";
      mensagem = `CA vencido em ${dataValidade.toLocaleDateString('pt-BR')}`;
    } else if (diffDays <= 30) {
      status = "próximo do vencimento";
      mensagem = `CA vence em ${diffDays} dia(s)`;
    }
    const epiToSave = { ...currentEPI, status, statusMensagem: mensagem };

    if (isEditing) {
      setEpis(prevEpis => prevEpis.map(epi => epi.id === epiToSave.id ? epiToSave : epi));
      toast({ 
        title: "EPI Atualizado", 
        description: "EPI foi atualizado com sucesso." 
      });
    } else {
      const newEPI = { ...epiToSave, id: Date.now().toString() };
      setEpis(prevEpis => [...prevEpis, newEPI]);
      toast({ 
        title: "EPI Adicionado", 
        description: "Novo EPI foi adicionado com sucesso." 
      });
    }

    setIsAddDialogOpen(false);
    setCurrentEPI(null);
    setIsEditing(false);
  };

  const handleAddNewEPI = () => {
    setCurrentEPI({
      nome: "",
      tipo: "",
      ca: "",
      fabricante: "",
      validade: "",
      fotoUrl: ""
    });
    setIsEditing(false);
    setIsAddDialogOpen(true);
  };

  const handleEditEPI = (epi) => {
    setCurrentEPI(epi);
    setIsEditing(true);
    setIsAddDialogOpen(true);
  };

  const handleDeleteEPI = (epiId) => {
    setEpis(prevEpis => prevEpis.filter(epi => epi.id !== epiId));
    toast({ 
      title: "EPI Removido", 
      description: "EPI foi removido com sucesso." 
    });
  };

  const handleViewDetails = (epi) => {
    setCurrentEPI(epi);
    setIsDetailsDialogOpen(true);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const renderEPICard = (epi, index) => {
    return (
      <motion.div
        key={epi.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <Card className={`overflow-hidden transition-all hover:shadow-lg ${epi.status === "vencido" ? "border-red-500/50" : ""}`}>
          <div className="relative">
            {epi.fotoUrl ? (
              <img
                alt={epi.nome}
                className="h-40 w-full object-cover"
                src={epi.fotoUrl}
                onError={(e) => {
                  e.target.src = "/company_logo_placeholder.png";
                }}
              />
            ) : (
              <div className="h-40 w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <Shield className="h-12 w-12 text-gray-400" />
              </div>
            )}
            <div className="absolute top-2 right-2">
              <EPIStatusBadge status={epi.status} />
            </div>
          </div>
          <CardHeader>
            <CardTitle className="text-lg text-primary">{epi.nome}</CardTitle>
            <CardDescription>{epi.tipo}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            <p><strong>CA:</strong> {epi.ca}</p>
            <p><strong>Fabricante:</strong> {epi.fabricante}</p>
            <p><strong>Validade:</strong> {new Date(epi.validade).toLocaleDateString('pt-BR')}</p>
            {epi.status === "vencido" && (
              <p className="text-red-500 font-medium">{epi.statusMensagem}</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => handleViewDetails(epi)} className="gap-1">
              <Eye className="h-4 w-4" /> Ver Detalhes
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  };

  const renderFormFields = () => (
    <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
      <div>
        <Label htmlFor="nome">Nome do EPI</Label>
        <Input id="nome" name="nome" value={currentEPI?.nome || ""} onChange={handleInputChange} />
      </div>
      <div>
        <Label htmlFor="tipo">Tipo de Proteção</Label>
        <Select value={currentEPI?.tipo || ""} onValueChange={(value) => setCurrentEPI(prev => ({ ...prev, tipo: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Proteção para Cabeça">Proteção para Cabeça</SelectItem>
            <SelectItem value="Proteção para Olhos e Face">Proteção para Olhos e Face</SelectItem>
            <SelectItem value="Proteção Auditiva">Proteção Auditiva</SelectItem>
            <SelectItem value="Proteção Respiratória">Proteção Respiratória</SelectItem>
            <SelectItem value="Proteção para o Tronco">Proteção para o Tronco</SelectItem>
            <SelectItem value="Proteção para os Membros Superiores">Proteção para os Membros Superiores</SelectItem>
            <SelectItem value="Proteção para os Membros Inferiores">Proteção para os Membros Inferiores</SelectItem>
            <SelectItem value="Proteção contra Quedas">Proteção contra Quedas</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="ca">Número do CA (5 dígitos)</Label>
        <Input id="ca" name="ca" value={currentEPI?.ca || ""} onChange={handleInputChange} maxLength={5} />
      </div>
      <div>
        <Label htmlFor="fabricante">Fabricante</Label>
        <Input id="fabricante" name="fabricante" value={currentEPI?.fabricante || ""} onChange={handleInputChange} />
      </div>
      <div>
        <Label htmlFor="validade">Data de Validade</Label>
        <Input id="validade" name="validade" type="date" value={currentEPI?.validade || ""} onChange={handleInputChange} />
      </div>
      <div>
        <Label htmlFor="fotoUrl">URL da Foto</Label>
        <Input 
          id="fotoUrl" 
          name="fotoUrl" 
          value={currentEPI?.fotoUrl || ""} 
          onChange={handleInputChange} 
          placeholder="https://exemplo.com/foto.jpg ou caminho local como /imagem.png" 
        />
        <p className="text-xs text-muted-foreground mt-1">
          Use URLs externas ou caminhos locais (ex: /capacete.png, /luvas.png)
        </p>
      </div>
    </div>
  );

  return (
    <div className="container py-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Gerenciamento de EPIs</h1>
          <p className="text-muted-foreground">Sistema avançado de controle e análise de equipamentos de proteção individual</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ThemeToggle isDark={isDarkMode} onToggle={toggleDarkMode} />
          <Button variant="outline" onClick={resetToOriginalData} className="gap-2">
            <Shield className="h-4 w-4" />
            Resetar Dados
          </Button>
          <Button onClick={handleAddNewEPI} className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden md:inline">Novo EPI</span>
          </Button>
        </div>
      </motion.div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="lista" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Lista</span>
          </TabsTrigger>
          <TabsTrigger value="analise" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span className="hidden md:inline">Análise</span>
          </TabsTrigger>
          <TabsTrigger value="graficos" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden md:inline">Gráficos</span>
          </TabsTrigger>
          <TabsTrigger value="relatorios" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden md:inline">Relatórios</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lista" className="space-y-6">
          <FiltrosAvancados 
            filters={filters} 
            setFilters={setFilters} 
            showFilters={showFilters} 
            setShowFilters={setShowFilters} 
          />
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredEpis.map(renderEPICard)}
            {filteredEpis.length === 0 && (
              <div className="col-span-full py-12 text-center">
                <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Nenhum EPI encontrado</h3>
                <p className="text-sm text-muted-foreground">
                  Tente ajustar sua busca ou cadastre um novo EPI.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="analise" className="space-y-6">
          <AnalisePreditiva epis={epis} />
        </TabsContent>

        <TabsContent value="graficos" className="space-y-6">
          <RelatoriosAvancados epis={epis} filters={filters} />
        </TabsContent>

        <TabsContent value="relatorios" className="space-y-6">
          <RelatoriosAvancados epis={epis} filters={filters} />
        </TabsContent>
      </Tabs>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Editar EPI" : "Adicionar Novo EPI"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Modifique os dados do EPI." : "Preencha os dados para cadastrar um novo EPI."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveEPI}>
            {renderFormFields()}
            <DialogFooter className="mt-4 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancelar</Button>
              <Button type="submit">{isEditing ? "Salvar Alterações" : "Adicionar EPI"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              {currentEPI?.nome}
              {currentEPI && <EPIStatusBadge status={currentEPI.status} />}
            </DialogTitle>
            <DialogDescription>{currentEPI?.tipo}</DialogDescription>
          </DialogHeader>
          {currentEPI && (
            <div className="space-y-3 py-2 max-h-[60vh] overflow-y-auto pr-2">
              {currentEPI.fotoUrl ? (
                <div className="w-full h-48 overflow-hidden rounded-md mb-3">
                  <img
                    src={currentEPI.fotoUrl}
                    alt={currentEPI.nome}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/company_logo_placeholder.png";
                    }}
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-md mb-3">
                  <Shield className="h-12 w-12 text-gray-400" />
                </div>
              )}
              <p><strong>CA:</strong> {currentEPI.ca}</p>
              <p><strong>Fabricante:</strong> {currentEPI.fabricante}</p>
              <p><strong>Validade:</strong> {new Date(currentEPI.validade).toLocaleDateString('pt-BR')}</p>
              <p className={`font-medium ${currentEPI.status === "vencido" ? "text-red-500" : currentEPI.status === "próximo do vencimento" ? "text-yellow-500" : "text-green-500"}`}>
                <strong>Status:</strong> {currentEPI.statusMensagem}
              </p>
            </div>
          )}
          <DialogFooter className="pt-4 border-t">
            <Button variant="outline" onClick={() => handleEditEPI(currentEPI)} className="gap-1">
              <Edit2 className="h-4 w-4" /> Editar
            </Button>
            <Button variant="destructive" onClick={() => handleDeleteEPI(currentEPI.id)} className="gap-1">
              <Trash2 className="h-4 w-4" /> Excluir
            </Button>
            <Button onClick={() => setIsDetailsDialogOpen(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EPIsListMelhorado; 