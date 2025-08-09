import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle, CheckCircle, Shield, UserCheck, UserX, XCircle } from 'lucide-react';
import React from 'react';


const EPIStatusBadge = ({ estaUsando, validacao }) => {
  if (!estaUsando) {
    return (
      <Badge variant="destructive" className="gap-1">
        <XCircle className="h-3 w-3" />
        <span>Não detectado</span>
      </Badge>
    );
  }
  switch (validacao.status) {
    case "válido":
      return (
        <Badge variant="success" className="gap-1">
          <CheckCircle className="h-3 w-3" />
          <span>OK</span>
        </Badge>
      );
    case "próximo do vencimento":
      return (
        <Badge variant="warning" className="gap-1">
          <AlertTriangle className="h-3 w-3" />
          <span>{validacao.mensagem}</span>
        </Badge>
      );
    case "vencido":
      return (
        <Badge variant="destructive" className="gap-1">
          <XCircle className="h-3 w-3" />
          <span>{validacao.mensagem}</span>
        </Badge>
      );
    default:
      return null;
  }
};


const ResultadoDialog = ({ isOpen, onOpenChange, colaborador, resultadoVerificacao, resultadoAcesso, onAutorizarAcesso, onReset, jaVerificadoHoje, ultimoRegistroAcesso }) => {
  if (!colaborador) return null;
  
  console.log(ultimoRegistroAcesso);
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {colaborador.nome}
            {resultadoAcesso?.autorizado ? (
              <Badge variant="success">Autorizado</Badge>
            ) : resultadoAcesso ? (
              <Badge variant="destructive">Negado</Badge>
            ) : null}
          </DialogTitle>
          <DialogDescription>
            Resultado da verificação dos EPIs

            {ultimoRegistroAcesso && (
              <div className="mt-2 block text-left">
                <span className="flex items-center gap-1 text-sm font-medium text-yellow-700">
                  <AlertTriangle className="inline h-4 w-4" />
                  Acesso já verificado hoje
                </span>

                <span className={`block mt-1 text-sm font-semibold ${ultimoRegistroAcesso.statusAcesso === "autorizado" ? "text-green-700" : "text-red-700"}`}>
                  Último resultado: {ultimoRegistroAcesso.statusAcesso === "autorizado" ? "Autorizado" : "Negado"}
                </span>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-full bg-muted">
              <img  alt={`Foto de ${colaborador.nome}`} className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1603201667141-5a2d4c673378" />
            </div>
            <div>
              <h4 className="font-medium">{colaborador.nome}</h4>
              <p className="text-sm text-muted-foreground">{colaborador.cargo} - {colaborador.setor}</p>
            </div>
          </div>
          
          {resultadoVerificacao && (
            <div className="space-y-3 rounded-md border p-3">
              <h4 className="font-medium">EPIs Verificados:</h4>
              <div className="space-y-2">
                {resultadoVerificacao.map((resultado, index) => (
                  <div key={index} className="flex items-center justify-between rounded-md bg-muted/40 p-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 overflow-hidden rounded-full">
                        <img
                          src={resultado.epi.fotoUrl}
                          alt={resultado.epi.nome}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            console.error(`Erro ao carregar imagem: ${resultado.epi.fotoUrl}`);
                            e.target.src = "company_logo_placeholder.png";
                          }}
                        />
                      </div>
                      <span className="text-sm">{resultado.epi.nome}</span>
                    </div>
                    <EPIStatusBadge estaUsando={resultado.estaUsando} validacao={resultado.validacao} />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {!resultadoAcesso ? (
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button
                onClick={onAutorizarAcesso}
                disabled={!resultadoVerificacao || jaVerificadoHoje}
              >
                Verificar Acesso
              </Button>
            </div>
          ) : (
            <div className="rounded-md border p-4 text-center">
              <div className="mb-2 flex justify-center">
                {resultadoAcesso.autorizado ? (
                  <UserCheck className="h-12 w-12 text-green-500" />
                ) : (
                  <UserX className="h-12 w-12 text-red-500" />
                )}
              </div>
              <h3 className="text-lg font-medium">
                {resultadoAcesso.autorizado ? "Acesso Autorizado" : "Acesso Negado"}
              </h3>
              <p className="mt-2 text-sm">
                {resultadoAcesso.mensagem}
              </p>
              <Button 
                className="mt-4" 
                variant={resultadoAcesso.autorizado ? "default" : "outline"}
                onClick={onReset}
              >
                Fechar
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResultadoDialog;
