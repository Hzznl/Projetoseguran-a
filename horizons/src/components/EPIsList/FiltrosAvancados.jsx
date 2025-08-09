import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, Search, Calendar, Shield, AlertTriangle } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";

const FiltrosAvancados = ({ filters, setFilters, showFilters, setShowFilters }) => {
  const clearFilters = () => {
    setFilters({
      status: "",
      tipo: "",
      vencimento: "",
      fabricante: ""
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== "");

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, tipo ou CA..."
            value={filters.search || ""}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="pl-10"
          />
        </div>
        <Button 
          variant="outline" 
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filtros
          {hasActiveFilters && (
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          )}
        </Button>
      </div>
      
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-card border rounded-lg p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtros Avançados
              </h3>
              <div className="flex gap-2">
                {hasActiveFilters && (
                  <Button variant="outline" size="sm" onClick={clearFilters} className="gap-1">
                    <X className="h-3 w-3" />
                    Limpar
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Status
                </Label>
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
                <Label className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Tipo de Proteção
                </Label>
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
                <Label className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Vencimento
                </Label>
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
                <Label className="flex items-center gap-1">
                  <Search className="h-3 w-3" />
                  Fabricante
                </Label>
                <Input 
                  placeholder="Buscar fabricante..."
                  value={filters.fabricante}
                  onChange={(e) => setFilters(prev => ({ ...prev, fabricante: e.target.value }))}
                />
              </div>
            </div>

            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-wrap gap-2 pt-2 border-t"
              >
                <span className="text-sm text-muted-foreground">Filtros ativos:</span>
                {filters.status && (
                  <Badge variant="secondary" className="gap-1">
                    Status: {filters.status}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setFilters(prev => ({ ...prev, status: "" }))}
                    />
                  </Badge>
                )}
                {filters.tipo && (
                  <Badge variant="secondary" className="gap-1">
                    Tipo: {filters.tipo}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setFilters(prev => ({ ...prev, tipo: "" }))}
                    />
                  </Badge>
                )}
                {filters.vencimento && (
                  <Badge variant="secondary" className="gap-1">
                    Vencimento: {filters.vencimento}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setFilters(prev => ({ ...prev, vencimento: "" }))}
                    />
                  </Badge>
                )}
                {filters.fabricante && (
                  <Badge variant="secondary" className="gap-1">
                    Fabricante: {filters.fabricante}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setFilters(prev => ({ ...prev, fabricante: "" }))}
                    />
                  </Badge>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FiltrosAvancados; 