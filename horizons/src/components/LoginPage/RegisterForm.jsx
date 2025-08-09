
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Mail, Lock, FileText } from 'lucide-react';

const RegisterForm = ({
  email,
  cpf,
  password,
  confirmPassword,
  showPassword,
  showConfirmPassword,
  onEmailChange,
  onCpfChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onTogglePasswordVisibility,
  onToggleConfirmPasswordVisibility,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="register-email">E-mail</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="register-email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={onEmailChange}
            className="pl-10 input-animated"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="register-cpf">CPF</Label>
        <div className="relative">
          <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="register-cpf"
            type="text"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={onCpfChange}
            className="pl-10 input-animated"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="register-password">Senha</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="register-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Crie uma senha (mín. 6 caracteres)"
            value={password}
            onChange={onPasswordChange}
            className="pl-10 pr-10 input-animated"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
            onClick={onTogglePasswordVisibility}
            aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <div>
        <Label htmlFor="register-confirm-password">Confirmar Senha</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="register-confirm-password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            className="pl-10 pr-10 input-animated"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
            onClick={onToggleConfirmPasswordVisibility}
            aria-label={showConfirmPassword ? "Esconder confirmação de senha" : "Mostrar confirmação de senha"}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <Button type="submit" className="w-full button-gradient text-white">
        Cadastrar
      </Button>
    </form>
  );
};

export default RegisterForm;
