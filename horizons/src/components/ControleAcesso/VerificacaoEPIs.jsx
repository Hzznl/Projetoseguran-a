import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Shield } from 'lucide-react';
import React from 'react';

const VerificacaoEPIs = ({ colaboradorId, setColaboradorId, handleVerificarColaborador, isVerificando }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Input
          type="text"
          placeholder="ID do Colaborador"
          value={colaboradorId}
          onChange={(e) => setColaboradorId(e.target.value)}
          className="flex-1"
          aria-label="ID do Colaborador"
        />
        <Button 
          onClick={handleVerificarColaborador}
          disabled={isVerificando}
          className="gap-2"
        >
          {isVerificando ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              <span>Verificando...</span>
            </>
          ) : (
            <>
              <Search className="h-4 w-4" />
              <span>Verificar</span>
            </>
          )}
        </Button>
      </div>
      
      <div className="rounded-lg border bg-muted/40 p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="sensor-pulse flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h3 className="text-lg font-medium">Sistema de Verificação de EPIs</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Aproxime o colaborador do sensor para verificar os EPIs
        </p>
      </div>
    </div>
  );
};

export default VerificacaoEPIs;
