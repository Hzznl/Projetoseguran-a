import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Brain, AlertTriangle, TrendingUp, Activity, Shield, CheckCircle, Clock, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";

const AnalisePreditiva = ({ epis }) => {
  const [predictions, setPredictions] = useState(null);
  const [recomendacoes, setRecomendacoes] = useState([]);
  const [riscoAcidente, setRiscoAcidente] = useState("BAIXO");
  const [estatisticas, setEstatisticas] = useState({});

  useEffect(() => {
    // Análise preditiva baseada nos dados dos EPIs
    const episVencendo = epis.filter(epi => epi.status === "próximo do vencimento").length;
    const episVencidos = epis.filter(epi => epi.status === "vencido").length;
    const totalEpis = epis.length;
    const episValidos = epis.filter(epi => epi.status === "válido").length;
    
    // Cálculo do risco
    let risco = "BAIXO";
    if (episVencidos > 0) {
      risco = "ALTO";
    } else if (episVencendo > totalEpis * 0.1) {
      risco = "MÉDIO";
    }
    
    setRiscoAcidente(risco);
    
    // Estatísticas
    setEstatisticas({
      total: totalEpis,
      vencidos: episVencidos,
      vencendo: episVencendo,
      validos: episValidos,
      percentualValidos: totalEpis > 0 ? Math.round((episValidos / totalEpis) * 100) : 0
    });
    
    // Recomendações da IA
    const recs = [];
    
    if (episVencidos > 0) {
      recs.push({
        tipo: "CRÍTICO",
        titulo: "Substituir EPIs vencidos imediatamente",
        descricao: `${episVencidos} EPI(s) vencido(s) representam risco grave à segurança`,
        icone: AlertTriangle,
        cor: "destructive"
      });
    }
    
    if (episVencendo > totalEpis * 0.1) {
      recs.push({
        tipo: "ATENÇÃO",
        titulo: "Renovar EPIs próximos do vencimento",
        descricao: `${episVencendo} EPI(s) vence(m) em breve`,
        icone: Clock,
        cor: "default"
      });
    }
    
    if (epis.filter(e => e.tipo === "Proteção para Cabeça").length === 0) {
      recs.push({
        tipo: "SUGESTÃO",
        titulo: "Considerar adicionar capacetes de segurança",
        descricao: "Nenhum EPI para proteção da cabeça cadastrado",
        icone: Shield,
        cor: "secondary"
      });
    }
    
    if (epis.filter(e => e.tipo === "Proteção para Olhos e Face").length === 0) {
      recs.push({
        tipo: "SUGESTÃO",
        titulo: "Considerar óculos de proteção",
        descricao: "Nenhum EPI para proteção ocular cadastrado",
        icone: Shield,
        cor: "secondary"
      });
    }
    
    if (totalEpis < 5) {
      recs.push({
        tipo: "SUGESTÃO",
        titulo: "Expandir inventário de EPIs",
        descricao: "Poucos EPIs cadastrados podem indicar cobertura inadequada",
        icone: TrendingUp,
        cor: "secondary"
      });
    }
    
    setRecomendacoes(recs);
    
    // Análise de tendências
    const tiposEPI = epis.reduce((acc, epi) => {
      acc[epi.tipo] = (acc[epi.tipo] || 0) + 1;
      return acc;
    }, {});
    
    const fabricantes = epis.reduce((acc, epi) => {
      acc[epi.fabricante] = (acc[epi.fabricante] || 0) + 1;
      return acc;
    }, {});
    
    setPredictions({
      tiposEPI,
      fabricantes,
      diversidadeTipos: Object.keys(tiposEPI).length,
      diversidadeFabricantes: Object.keys(fabricantes).length
    });
    
  }, [epis]);

  if (!predictions) return null;

  return (
    <div className="space-y-6">
      {/* Card Principal de Risco */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className={`bg-gradient-to-r ${
          riscoAcidente === "ALTO" 
            ? "from-red-50 to-pink-50 dark:from-red-950 dark:to-pink-950 border-red-200" 
            : riscoAcidente === "MÉDIO" 
            ? "from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950 border-orange-200"
            : "from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200"
        }`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              Análise Preditiva de Segurança
            </CardTitle>
            <CardDescription>
              Análise inteligente baseada nos dados dos EPIs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span className="font-medium">Nível de Risco: </span>
              </div>
              <Badge variant={riscoAcidente === "ALTO" ? "destructive" : riscoAcidente === "MÉDIO" ? "default" : "secondary"}>
                {riscoAcidente}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{estatisticas.total}</div>
                <div className="text-xs text-muted-foreground">Total EPIs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{estatisticas.validos}</div>
                <div className="text-xs text-muted-foreground">Válidos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{estatisticas.vencendo}</div>
                <div className="text-xs text-muted-foreground">Vencendo</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{estatisticas.vencidos}</div>
                <div className="text-xs text-muted-foreground">Vencidos</div>
              </div>
            </div>
            
            <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium">Taxa de Conformidade</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${estatisticas.percentualValidos}%` }}
                ></div>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {estatisticas.percentualValidos}% dos EPIs estão em conformidade
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recomendações da IA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Recomendações da IA
            </CardTitle>
            <CardDescription>
              Sugestões inteligentes baseadas na análise dos dados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recomendacoes.length > 0 ? (
                recomendacoes.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg border"
                  >
                    <rec.icone className={`h-5 w-5 mt-0.5 ${
                      rec.cor === "destructive" ? "text-red-500" :
                      rec.cor === "default" ? "text-orange-500" : "text-blue-500"
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={rec.cor} className="text-xs">
                          {rec.tipo}
                        </Badge>
                        <span className="font-medium">{rec.titulo}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{rec.descricao}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                  <p className="text-muted-foreground">Excelente! Todos os EPIs estão em conformidade.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Análise de Diversidade */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Diversidade de Tipos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {predictions.diversidadeTipos}
              </div>
              <p className="text-sm text-muted-foreground">
                Tipos diferentes de EPIs
              </p>
              <div className="mt-3 text-xs text-muted-foreground">
                {Object.entries(predictions.tiposEPI).map(([tipo, count]) => (
                  <div key={tipo} className="flex justify-between">
                    <span>{tipo}</span>
                    <span>{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Fabricantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {predictions.diversidadeFabricantes}
              </div>
              <p className="text-sm text-muted-foreground">
                Fabricantes diferentes
              </p>
              <div className="mt-3 text-xs text-muted-foreground">
                {Object.entries(predictions.fabricantes).map(([fabricante, count]) => (
                  <div key={fabricante} className="flex justify-between">
                    <span>{fabricante}</span>
                    <span>{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AnalisePreditiva; 