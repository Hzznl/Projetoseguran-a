
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, UserPlus, Lock } from 'lucide-react';
import LoginForm from '@/components/LoginPage/LoginForm';
import RegisterForm from '@/components/LoginPage/RegisterForm';
import ForgotPasswordForm from '@/components/LoginPage/ForgotPasswordForm';
import { useAuthForm } from '@/hooks/useAuthForm';

const LoginPage = ({ onLoginSuccess }) => {
  const [formType, setFormType] = useState('login');
  
  const {
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
  } = useAuthForm(onLoginSuccess, setFormType);

  return (
    <div className="flex min-h-screen items-center justify-center login-bg p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl glass-card border-0 relative z-10">
          <CardHeader className="text-center">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mx-auto mb-4 floating"
            >
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                {formType === 'login' && <ShieldCheck size={32} className="text-white" />}
                {formType === 'register' && <UserPlus size={32} className="text-white" />}
                {formType === 'forgotPassword' && <Lock size={32} className="text-white" />}
              </div>
            </motion.div>
            <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-emerald-500">
              {formType === 'login' && 'Bem-vindo!'}
              {formType === 'register' && 'Crie sua Conta'}
              {formType === 'forgotPassword' && 'Recuperar Senha'}
            </CardTitle>
            <CardDescription className="text-gray-100">
              {formType === 'login' && 'Acesse sua conta para gerenciar a segurança.'}
              {formType === 'register' && 'Preencha os campos para se registrar.'}
              {formType === 'forgotPassword' && 'Insira seu e-mail ou CPF para redefinir sua senha.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={formType}
                initial={{ opacity: 0, x: formType === 'login' ? 0 : (formType === 'register' ? 20 : -20) }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: formType === 'login' ? (email || cpf ? 20 : -20) : 0 }}
                transition={{ duration: 0.3 }}
              >
                {formType === 'login' && (
                  <LoginForm
                    email={email}
                    cpf={cpf}
                    password={password}
                    showPassword={showPassword}
                    onIdentifierChange={handleIdentifierChange}
                    onPasswordChange={(e) => setPassword(e.target.value)}
                    onTogglePasswordVisibility={togglePasswordVisibility}
                    onSubmit={handleLogin}
                    onSwitchToForgotPassword={() => setFormType('forgotPassword')}
                  />
                )}
                {formType === 'register' && (
                  <RegisterForm
                    email={email}
                    cpf={cpf}
                    password={password}
                    confirmPassword={confirmPassword}
                    showPassword={showPassword}
                    showConfirmPassword={showConfirmPassword}
                    onEmailChange={(e) => setEmail(e.target.value)}
                    onCpfChange={(e) => setCpf(e.target.value.replace(/\D/g, ''))}
                    onPasswordChange={(e) => setPassword(e.target.value)}
                    onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
                    onTogglePasswordVisibility={togglePasswordVisibility}
                    onToggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
                    onSubmit={handleRegister}
                  />
                )}
                {formType === 'forgotPassword' && (
                  <ForgotPasswordForm
                    email={email}
                    cpf={cpf}
                    onIdentifierChange={handleIdentifierChange}
                    onSubmit={handleForgotPassword}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2">
            {formType === 'login' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-100"
              >
                Não tem uma conta?{' '}
                <button
                  onClick={() => setFormType('register')}
                  className="font-medium text-emerald-300 hover:text-emerald-200 transition-colors"
                  aria-label="Mudar para formulário de cadastro"
                >
                  Cadastre-se
                </button>
              </motion.p>
            )}
            {(formType === 'register' || formType === 'forgotPassword') && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-100"
              >
                Já tem uma conta?{' '}
                <button
                  onClick={() => setFormType('login')}
                  className="font-medium text-emerald-300 hover:text-emerald-200 transition-colors"
                  aria-label="Mudar para formulário de login"
                >
                  Faça login
                </button>
              </motion.p>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
