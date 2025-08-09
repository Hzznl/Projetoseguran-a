import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const LoginForm = ({
  email,
  cpf,
  password,
  showPassword,
  onIdentifierChange,
  onPasswordChange,
  onTogglePasswordVisibility,
  onSubmit,
  onSwitchToForgotPassword,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex justify-center mb-6">
        <img src="/company_logo_placeholder.png" alt="Company Logo" className="h-20 w-20 object-contain" />
      </div>
      <div>
        <Label htmlFor="login-identifier">E-mail ou CPF</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="login-identifier"
            type="text"
            placeholder="seu@email.com ou 000.000.000-00"
            value={email || cpf}
            onChange={onIdentifierChange}
            className="pl-10 input-animated"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="login-password">Senha</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Sua senha"
            value={password}
            onChange={onPasswordChange}
            className="pl-10 pr-10 input-animated"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            onClick={onTogglePasswordVisibility}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <Button type="submit" className="w-full">
        Entrar
      </Button>
      <div className="text-center">
        <Button type="button" variant="link" onClick={onSwitchToForgotPassword}>
          Esqueceu sua senha?
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;


