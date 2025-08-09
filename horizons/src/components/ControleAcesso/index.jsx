import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  autorizarAcesso,
  colaboradoresData,
  getRegistrosAcesso,
  salvarRegistroAcesso,
  simularLeituraSensor
} from "@/lib/data";
import { motion } from "framer-motion";
import {
  Clock
} from "lucide-react";
import React, { useState } from "react";
import ResultadoDialog from "./ResultadoDialog";
import VerificacaoEPIs from "./VerificacaoEPIs";

function getRegistroAcessoHoje(colaboradorId) {
  const hoje = new Date().toISOString().split('T')[0];
  return getRegistrosAcesso().find(
    reg =>
      reg.colaboradorId === colaboradorId &&
      reg.data?.startsWith(hoje)
  ) || null;
}

function colaboradorJaVerificadoHoje(colaboradorId) {
  return !!getRegistroAcessoHoje(colaboradorId);
}

const ControleAcesso = () => {
  const [colaboradorId, setColaboradorId] = useState("");
  const [resultadoVerificacao, setResultadoVerificacao] = useState(null);
  const [resultadoAcesso, setResultadoAcesso] = useState(null);
  const [isVerificando, setIsVerificando] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [colaboradorSelecionado, setColaboradorSelecionado] = useState(null);
  const { toast } = useToast();
  const [jaVerificadoHoje, setJaVerificadoHoje] = useState(false);
  const [ultimoRegistroAcesso, setUltimoRegistroAcesso] = useState(null);

  const handleVerificarColaborador = () => {
    if (!colaboradorId) {
      toast({
        title: "Erro",
        description: "Por favor, informe o ID do colaborador",
        variant: "destructive"
      });
      return;
    }

    const id = parseInt(colaboradorId);
    const colaborador = colaboradoresData.find(c => c.id === id);
    
    if (!colaborador) {
      toast({
        title: "Colaborador não encontrado",
        description: "Verifique o ID informado e tente novamente",
        variant: "destructive"
      });
      return;
    }

    setColaboradorSelecionado(colaborador);

    // Verifica se já foi verificado hoje
    setJaVerificadoHoje(colaboradorJaVerificadoHoje(id));
    setUltimoRegistroAcesso(getRegistroAcessoHoje(id));

    setIsVerificando(true);
    setResultadoAcesso(null);
    
    setTimeout(() => {
      const resultados = simularLeituraSensor(id);
      setResultadoVerificacao(resultados);
      setIsVerificando(false);
      setIsDialogOpen(true);
    }, 1500);
  };

  const handleAutorizarAcesso = () => {
    if (!colaboradorSelecionado || !resultadoVerificacao) return;
    
    const resultado = autorizarAcesso(colaboradorSelecionado.id, resultadoVerificacao);
    setResultadoAcesso(resultado);
    
    const epiVerificados = resultadoVerificacao.map(r => ({
      epiId: r.epi.id,
      status: r.estaUsando && r.validacao.status !== "vencido" ? "ok" : 
              !r.estaUsando ? "não detectado" : "vencido"
    }));
    
    salvarRegistroAcesso(
      colaboradorSelecionado.id,
      resultado.autorizado ? "autorizado" : "negado",
      epiVerificados
    );
    
    toast({
      title: resultado.autorizado ? "Acesso Autorizado" : "Acesso Negado",
      description: resultado.mensagem,
      variant: resultado.autorizado ? "default" : "destructive"
    });
  };

  const resetarVerificacao = () => {
    setColaboradorId("");
    setResultadoVerificacao(null);
    setResultadoAcesso(null);
    setColaboradorSelecionado(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="container py-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-3xl font-bold"
      >
        Controle de Acesso
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-3xl"
      >
        <Card className="border-2 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Verificação de EPIs</CardTitle>
            <CardDescription>
              Verifique se o colaborador está com todos os EPIs necessários antes de autorizar o acesso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <VerificacaoEPIs
              colaboradorId={colaboradorId}
              setColaboradorId={setColaboradorId}
              handleVerificarColaborador={handleVerificarColaborador}
              isVerificando={isVerificando}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetarVerificacao}>
              Limpar
            </Button>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <Clock className="h-3 w-3" />
                <span>{new Date().toLocaleString('pt-BR')}</span>
              </Badge>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
      
      <ResultadoDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        colaborador={colaboradorSelecionado}
        resultadoVerificacao={resultadoVerificacao}
        resultadoAcesso={resultadoAcesso}
        onAutorizarAcesso={handleAutorizarAcesso}
        onReset={resetarVerificacao}
        jaVerificadoHoje={jaVerificadoHoje}
        ultimoRegistroAcesso={ultimoRegistroAcesso}
      />
    </div>
  );
};

export default ControleAcesso;
