
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

const ForgotPasswordForm = ({
  email,
  cpf,
  onIdentifierChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <Label htmlFor="forgot-identifier">E-mail ou CPF</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="forgot-identifier"
            type="text"
            placeholder="Seu e-mail ou CPF cadastrado"
            value={email || cpf}
            onChange={onIdentifierChange}
            className="pl-10 input-animated"
          />
        </div>
      </div>
      <Button type="submit" className="w-full button-gradient text-white">
        Recuperar Senha
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
