import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  FileText, 
  Download, 
  BarChart3, 
  Brain, 
  Shield, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle, 
  Moon, 
  Sun,
  Filter,
  Search,
  Zap,
  Activity
} from "lucide-react";
import React from "react";

const DemoMelhorias = () => {
  return (
    <div className="container py-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4">🚀 Melhorias Implementadas</h1>
        <p className="text-xl text-muted-foreground">
          Sistema de EPIs com funcionalidades avançadas de IA, relatórios e interface moderna
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Relatórios Avançados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="h-full hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Relatórios Avançados
              </CardTitle>
              <CardDescription>
                Geração de relatórios profissionais em PDF e Excel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-green-600" />
                <span className="text-sm">Exportação PDF personalizada</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Gráficos comparativos</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                <span className="text-sm">Relatórios automáticos</span>
              </div>
              <Badge variant="secondary" className="w-fit">jsPDF + Recharts</Badge>
            </CardContent>
          </Card>
        </motion.div>

        {/* Análise Preditiva */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Análise Preditiva
              </CardTitle>
              <CardDescription>
                IA para análise de riscos e recomendações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-red-600" />
                <span className="text-sm">Cálculo de risco automático</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-600" />
                <span className="text-sm">Recomendações inteligentes</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-sm">Detecção de padrões</span>
              </div>
              <Badge variant="secondary" className="w-fit">IA Integrada</Badge>
            </CardContent>
          </Card>
        </motion.div>

        {/* Interface Moderna */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="h-5 w-5 text-indigo-600" />
                Interface Moderna
              </CardTitle>
              <CardDescription>
                Design responsivo e temas personalizáveis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-orange-600" />
                <span className="text-sm">Modo escuro/claro</span>
              </div>
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Responsivo mobile</span>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-green-600" />
                <span className="text-sm">Filtros avançados</span>
              </div>
              <Badge variant="secondary" className="w-fit">Tailwind + Framer</Badge>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Funcionalidades Detalhadas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Filtros Avançados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Sistema de Filtros Avançados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Filtros por Status</h4>
                <div className="space-y-1">
                  <Badge variant="outline" className="gap-1"><CheckCircle className="h-3 w-3" /> Válido</Badge>
                  <Badge variant="outline" className="gap-1"><AlertTriangle className="h-3 w-3" /> Próximo Vencimento</Badge>
                  <Badge variant="outline" className="gap-1"><AlertTriangle className="h-3 w-3" /> Vencido</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Filtros por Vencimento</h4>
                <div className="space-y-1">
                  <Badge variant="outline">7 dias</Badge>
                  <Badge variant="outline">30 dias</Badge>
                  <Badge variant="outline">90 dias</Badge>
                </div>
              </div>
            </div>
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Busca Avançada:</strong> Encontre EPIs por nome, tipo, CA ou fabricante
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Análise de Risco */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Análise de Risco Inteligente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">85%</div>
                <div className="text-xs text-muted-foreground">Conformidade</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">12%</div>
                <div className="text-xs text-muted-foreground">Vencendo</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">3%</div>
                <div className="text-xs text-muted-foreground">Vencidos</div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-red-50 p-3 rounded-lg">
              <p className="text-sm">
                <strong>Risco Atual:</strong> BAIXO - Sistema em conformidade
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Benefícios */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6 rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">🎯 Benefícios das Melhorias</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold mb-2">Para Gestores</h3>
            <p className="text-sm text-muted-foreground">
              Visão completa do status dos EPIs, relatórios profissionais e análise preditiva de riscos
            </p>
          </div>
          <div className="text-center">
            <Search className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold mb-2">Para Usuários</h3>
            <p className="text-sm text-muted-foreground">
              Busca e filtros avançados, visualizações claras e recomendações inteligentes
            </p>
          </div>
          <div className="text-center">
            <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold mb-2">Para Compliance</h3>
            <p className="text-sm text-muted-foreground">
              Relatórios em PDF, exportação de dados e rastreabilidade completa
            </p>
          </div>
        </div>
      </motion.div>

      {/* Como Usar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-muted p-6 rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4">📋 Como Usar as Melhorias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">1. Acesse a Seção EPIs</h3>
            <ul className="space-y-2 text-sm">
              <li>• Navegue até "EPIs" no menu lateral</li>
              <li>• Use as abas para diferentes funcionalidades</li>
              <li>• Explore Lista, Análise, Gráficos e Relatórios</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">2. Utilize os Filtros</h3>
            <ul className="space-y-2 text-sm">
              <li>• Clique em "Filtros" para opções avançadas</li>
              <li>• Configure status, tipo, vencimento</li>
              <li>• Use busca textual para encontrar EPIs</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">3. Analise com IA</h3>
            <ul className="space-y-2 text-sm">
              <li>• Acesse a aba "Análise"</li>
              <li>• Veja o nível de risco calculado</li>
              <li>• Leia as recomendações da IA</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">4. Gere Relatórios</h3>
            <ul className="space-y-2 text-sm">
              <li>• Vá para a aba "Relatórios"</li>
              <li>• Clique em "Gerar PDF"</li>
              <li>• Exporte dados em CSV/Excel</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-center"
      >
        <Button size="lg" className="gap-2">
          <Shield className="h-5 w-5" />
          Explorar Sistema de EPIs
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Todas as funcionalidades estão integradas e prontas para uso
        </p>
      </motion.div>
    </div>
  );
};

export default DemoMelhorias; 