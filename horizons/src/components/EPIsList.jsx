
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
import { AlertTriangle, CheckCircle, Edit2, Eye, Plus, Search, Shield, Trash2, XCircle, FileText, Download, BarChart3, TrendingUp, Brain, Smartphone, Moon, Sun, Palette, Filter, Calendar, PieChart, Activity } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, Line, LineChart, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Componente para modo escuro/claro
const ThemeToggle = ({ isDark, onToggle }) => (
  <Button variant="outline" size="sm" onClick={onToggle} className="gap-2">
    {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    {isDark ? "Modo Claro" : "Modo Escuro"}
  </Button>
);

// Componente para filtros avançados
const AdvancedFilters = ({ filters, setFilters }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-card border rounded-lg">
    <div>
      <Label>Status</Label>
      <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
        <SelectTrigger>
          <SelectValue placeholder="Todos os status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Todos</SelectItem>
          <SelectItem value="válido">Válido</SelectItem>
          <SelectItem value="próximo do vencimento">Próximo do Vencimento</SelectItem>
          <SelectItem value="vencido">Vencido</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div>
      <Label>Tipo de Proteção</Label>
      <Select value={filters.tipo} onValueChange={(value) => setFilters(prev => ({ ...prev, tipo: value }))}>
        <SelectTrigger>
          <SelectValue placeholder="Todos os tipos" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Todos</SelectItem>
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
      <Label>Vencimento</Label>
      <Select value={filters.vencimento} onValueChange={(value) => setFilters(prev => ({ ...prev, vencimento: value }))}>
        <SelectTrigger>
          <SelectValue placeholder="Todos" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Todos</SelectItem>
          <SelectItem value="7dias">Vence em 7 dias</SelectItem>
          <SelectItem value="30dias">Vence em 30 dias</SelectItem>
          <SelectItem value="90dias">Vence em 90 dias</SelectItem>
          <SelectItem value="vencido">Já vencido</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div>
      <Label>Fabricante</Label>
      <Input 
        placeholder="Buscar fabricante..."
        value={filters.fabricante}
        onChange={(e) => setFilters(prev => ({ ...prev, fabricante: e.target.value }))}
      />
    </div>
  </div>
);

// Componente para análise preditiva
const PredictiveAnalysis = ({ epis }) => {
  const [predictions, setPredictions] = useState(null);

  useEffect(() => {
    // Simulação de análise preditiva
    const episVencendo = epis.filter(epi => epi.status === "próximo do vencimento").length;
    const episVencidos = epis.filter(epi => epi.status === "vencido").length;
    const totalEpis = epis.length;
    
    const riscoAcidente = episVencidos > 0 ? "ALTO" : episVencendo > totalEpis * 0.1 ? "MÉDIO" : "BAIXO";
    const recomendacoes = [];
    
    if (episVencidos > 0) {
      recomendacoes.push("Substituir EPIs vencidos imediatamente");
    }
    if (episVencendo > totalEpis * 0.1) {
      recomendacoes.push("Renovar EPIs próximos do vencimento");
    }
    if (epis.filter(e => e.tipo === "Proteção para Cabeça").length === 0) {
      recomendacoes.push("Considerar adicionar capacetes de segurança");
    }
    
    setPredictions({
      riscoAcidente,
      recomendacoes,
      estatisticas: {
        total: totalEpis,
        vencidos: episVencidos,
        vencendo: episVencendo,
        validos: epis.filter(e => e.status === "válido").length
      }
    });
  }, [epis]);

  if (!predictions) return null;

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-600" />
          Análise Preditiva de Segurança
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          <span className="font-medium">Nível de Risco: </span>
          <Badge variant={predictions.riscoAcidente === "ALTO" ? "destructive" : predictions.riscoAcidente === "MÉDIO" ? "default" : "secondary"}>
            {predictions.riscoAcidente}
          </Badge>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Recomendações da IA:</h4>
          <ul className="space-y-1">
            {predictions.recomendacoes.map((rec, index) => (
              <li key={index} className="text-sm flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                {rec}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Total EPIs:</span>
            <div className="font-medium">{predictions.estatisticas.total}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Válidos:</span>
            <div className="font-medium text-green-600">{predictions.estatisticas.validos}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Vencendo:</span>
            <div className="font-medium text-orange-600">{predictions.estatisticas.vencendo}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Vencidos:</span>
            <div className="font-medium text-red-600">{predictions.estatisticas.vencidos}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Componente para gráficos avançados
const AdvancedCharts = ({ epis }) => {
  const chartData = {
    status: [
      { name: 'Válidos', value: epis.filter(e => e.status === "válido").length, color: '#22c55e' },
      { name: 'Próximo Vencimento', value: epis.filter(e => e.status === "próximo do vencimento").length, color: '#f97316' },
      { name: 'Vencidos', value: epis.filter(e => e.status === "vencido").length, color: '#ef4444' }
    ],
    tipos: epis.reduce((acc, epi) => {
      acc[epi.tipo] = (acc[epi.tipo] || 0) + 1;
      return acc;
    }, {}),
    fabricantes: epis.reduce((acc, epi) => {
      acc[epi.fabricante] = (acc[epi.fabricante] || 0) + 1;
      return acc;
    }, {})
  };

  const fabricantesData = Object.entries(chartData.fabricantes).map(([fabricante, count]) => ({
    name: fabricante,
    value: count
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Status dos EPIs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <RechartsPieChart>
              <Pie
                data={chartData.status}
                cx="50%"
                cy="50%"
                outerRadius={60}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.status.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Fabricantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={fabricantesData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

// Função para gerar relatório PDF
const generatePDFReport = (epis, filters) => {
  const doc = new jsPDF();
  
  // Título
  doc.setFontSize(20);
  doc.text('Relatório de EPIs - SegurançaPro', 20, 20);
  
  // Data
  doc.setFontSize(12);
  doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 20, 30);
  
  // Estatísticas
  doc.setFontSize(14);
  doc.text('Estatísticas Gerais:', 20, 45);
  
  const total = epis.length;
  const validos = epis.filter(e => e.status === "válido").length;
  const vencendo = epis.filter(e => e.status === "próximo do vencimento").length;
  const vencidos = epis.filter(e => e.status === "vencido").length;
  
  doc.setFontSize(12);
  doc.text(`Total de EPIs: ${total}`, 20, 55);
  doc.text(`EPIs Válidos: ${validos}`, 20, 65);
  doc.text(`Próximos do Vencimento: ${vencendo}`, 20, 75);
  doc.text(`EPIs Vencidos: ${vencidos}`, 20, 85);
  
  // Tabela de EPIs
  const tableData = epis.map(epi => [
    epi.nome,
    epi.tipo,
    epi.ca,
    epi.fabricante,
    new Date(epi.validade).toLocaleDateString('pt-BR'),
    epi.status
  ]);
  
  doc.autoTable({
    startY: 100,
    head: [['Nome', 'Tipo', 'CA', 'Fabricante', 'Validade', 'Status']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [59, 130, 246] }
  });
  
  // Salvar PDF
  doc.save('relatorio-epis.pdf');
};

// Função para exportar Excel
const exportToExcel = (epis) => {
  const headers = ['Nome', 'Tipo', 'CA', 'Fabricante', 'Validade', 'Status', 'Dias para Vencimento'];
  const data = epis.map(epi => [
    epi.nome,
    epi.tipo,
    epi.ca,
    epi.fabricante,
    new Date(epi.validade).toLocaleDateString('pt-BR'),
    epi.status,
    epi.diasParaVencer || 0
  ]);
  
  const csvContent = [headers, ...data]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'epis-export.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

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

const EPIsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [epis, setEpis] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEPI, setCurrentEPI] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("lista");
  const { toast } = useToast();

  // Filtros avançados
  const [filters, setFilters] = useState({
    status: "",
    tipo: "",
    vencimento: "",
    fabricante: ""
  });

  // Carregar dados originais do raw-epi-data.js
  useEffect(() => {
    // Limpar localStorage para usar dados originais
    localStorage.removeItem("epiDataSafety");
    
    // Carregar dados originais
    const originalData = loadEpiData();
    console.log("Dados originais carregados:", originalData);
    setEpis(originalData);
  }, []);

  useEffect(() => {
    if (epis.length > 0) {
      updateEpiData(epis);
    }
  }, [epis]);

  // Aplicar filtros
  const filteredEpis = epis.filter(epi => {
    const matchesSearch = epi.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         epi.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         epi.ca.includes(searchTerm) ||
                         epi.fabricante.toLowerCase().includes(searchTerm.toLowerCase());
    
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

  // Função para resetar dados para os originais
  const resetToOriginalData = () => {
    localStorage.removeItem("epiDataSafety");
    const originalData = loadEpiData();
    setEpis(originalData);
    toast({ 
      title: "Dados Resetados", 
      description: "Dados originais do raw-epi-data.js foram carregados." 
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
    console.log(`Renderizando EPI ${epi.nome}:`, epi.fotoUrl);
    
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
                  console.error(`Erro ao carregar imagem para ${epi.nome}:`, epi.fotoUrl);
                  e.target.src = "/company_logo_placeholder.png";
                }}
                onLoad={() => {
                  console.log(`Imagem carregada com sucesso para ${epi.nome}:`, epi.fotoUrl);
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
            <TrendingUp className="h-4 w-4" />
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, tipo ou CA..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button 
                variant="outline" 
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </div>
            
            <AnimatePresence>
              {showAdvancedFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <AdvancedFilters filters={filters} setFilters={setFilters} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
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
          <PredictiveAnalysis epis={epis} />
        </TabsContent>

        <TabsContent value="graficos" className="space-y-6">
          <AdvancedCharts epis={epis} />
        </TabsContent>

        <TabsContent value="relatorios" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Relatório PDF
                </CardTitle>
                <CardDescription>
                  Gera relatório completo em PDF com todos os dados dos EPIs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  O relatório incluirá estatísticas gerais, tabela completa de EPIs e análise de status.
                </p>
                <Button onClick={() => generatePDFReport(epis, filters)} className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Gerar PDF
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Exportar Excel
                </CardTitle>
                <CardDescription>
                  Exporta dados filtrados para arquivo CSV/Excel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Exporta {filteredEpis.length} EPIs com todos os dados para análise externa.
                </p>
                <Button onClick={() => exportToExcel(filteredEpis)} className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Exportar CSV
                </Button>
              </CardContent>
            </Card>
          </div>
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
                      console.error(`Erro ao carregar imagem: ${currentEPI.fotoUrl}`);
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

export default EPIsList;
