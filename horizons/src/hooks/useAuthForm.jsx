
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

export const useAuthForm = (onLoginSuccess, setFormTypeExternal) => {
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();

  const handleIdentifierChange = (e) => {
    const value = e.target.value;
    if (value.includes('@') || value === '' || (/^[a-zA-Z0-9@._+-]*$/.test(value) && !/[0-9.-]/.test(value.replace(/@.*/, '')))) {
      setEmail(value);
      setCpf('');
    } else {
      setCpf(value.replace(/\D/g, ''));
      setEmail('');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email && !cpf) {
      toast({ title: 'Erro', description: 'Por favor, insira seu e-mail ou CPF.', variant: 'destructive' });
      return;
    }
    if (!password) {
      toast({ title: 'Erro', description: 'Por favor, insira sua senha.', variant: 'destructive' });
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (u) => (u.email === email || u.cpf === cpf) && u.password === password
    );

    if (user) {
      toast({ title: 'Login bem-sucedido!', description: `Bem-vindo de volta, ${user.email || user.cpf}!` });
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      onLoginSuccess();
    } else {
      toast({ title: 'Erro de Login', description: 'E-mail/CPF ou senha inválidos.', variant: 'destructive' });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!email) {
      toast({ title: 'Erro', description: 'Por favor, insira seu e-mail.', variant: 'destructive' });
      return;
    }
    if (!cpf) {
      toast({ title: 'Erro', description: 'Por favor, insira seu CPF.', variant: 'destructive' });
      return;
    }
    if (password.length < 6) {
      toast({ title: 'Erro', description: 'A senha deve ter pelo menos 6 caracteres.', variant: 'destructive' });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: 'Erro', description: 'As senhas não coincidem.', variant: 'destructive' });
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email === email)) {
      toast({ title: 'Erro de Cadastro', description: 'Este e-mail já está cadastrado.', variant: 'destructive' });
      return;
    }
    if (users.some(u => u.cpf === cpf)) {
      toast({ title: 'Erro de Cadastro', description: 'Este CPF já está cadastrado.', variant: 'destructive' });
      return;
    }

    const newUser = { email, cpf, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    toast({ title: 'Cadastro realizado!', description: 'Você já pode fazer login.' });
    setFormTypeExternal('login');
    setEmail('');
    setCpf('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!email && !cpf) {
      toast({ title: 'Erro', description: 'Por favor, insira seu e-mail ou CPF para recuperação.', variant: 'destructive' });
      return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(u => u.email === email || u.cpf === cpf);

    if (userExists) {
      toast({ title: 'Recuperação de Senha', description: `Instruções para redefinir sua senha foram enviadas para ${email || 'o e-mail associado ao CPF'}. (Simulado)` });
      setFormTypeExternal('login');
      setEmail('');
      setCpf('');
    } else {
      toast({ title: 'Erro', description: 'E-mail ou CPF não encontrado.', variant: 'destructive' });
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return {
    email,
    setEmail,
    cpf,
    setCpf,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    showConfirmPassword,
    handleIdentifierChange,
    handleLogin,
    handleRegister,
    handleForgotPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  };
};
