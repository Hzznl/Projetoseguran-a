import { Button } from '@/components/ui/button';
import { useSpeech } from '@/contexts/SpeechContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  AlertOctagon,
  AlertTriangle,
  Camera,
  GitBranch,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Shield,
  Target,
  Users,
  Layers
} from 'lucide-react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: 'dashboard', description: 'Painel principal com visão geral do sistema' },
  { name: 'Colaboradores', icon: Users, path: 'colaboradores', description: 'Gerenciamento de colaboradores' },
  { name: 'EPIs', icon: Shield, path: 'epis', description: 'Gerenciamento de Equipamentos de Proteção Individual' },
  { name: 'Sistema Completo', icon: Layers, path: 'sistema-completo', description: 'Sistema completo de gestão de EPIs com todas as funcionalidades' },
  { name: 'Controle de Acesso', icon: GitBranch, path: 'controle-acesso', description: 'Controle de acesso dos colaboradores' },
  { name: 'Ocorrências', icon: AlertOctagon, path: 'ocorrencias', description: 'Registro e gerenciamento de ocorrências' },
  { name: 'Monitoramento de EPI com IA', icon: Camera, path: 'monitoramento-ia', description: 'Monitoramento de EPI com IA' },
  { name: 'PGR', icon: AlertTriangle, path: 'pgr', description: 'Programa de Gerenciamento de Riscos' },
  { name: 'Plano de Ação', icon: Target, path: 'plano-acao', description: 'Plano de ações corretivas e preventivas' },
  { name: 'Assistente IA', icon: MessageSquare, path: 'assistente-ia', description: 'Assistente virtual para tirar dúvidas' },
  { name: 'Configurações', icon: Settings, path: 'configuracoes', description: 'Configurações do sistema' },
];

const Sidebar = ({ isOpen, onLogout }) => {
  const { speak, isNarrationEnabled } = useSpeech();
  const navigate = useNavigate();
  const location = useLocation();

  const handleMouseEnter = (text) => {
    if (isNarrationEnabled()) {
      speak(text, 'secondary');
    }
  };

  const handleItemClick = (path, description) => {
    console.log('Navegando para:', path, description);
    navigate(path.startsWith("/") ? path : `/${path}`);
    if (isNarrationEnabled()) {
      speak(`Navegando para ${description}`, 'primary');
    }
  };
  
  const handleLogoutClick = () => {
    if (isNarrationEnabled()) {
      speak('Saindo do sistema', 'primary');
    }
    onLogout();
  };

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ 
        x: isOpen ? 0 : -300,
        opacity: isOpen ? 1 : 0,
        width: isOpen ? '16rem' : '0rem'
      }}
      transition={{ 
        duration: 0.3,
        ease: "easeInOut"
      }}
      className={cn(
        "fixed left-0 top-0 z-50 h-screen bg-card text-card-foreground shadow-lg transition-all duration-300 ease-in-out",
        "flex flex-col overflow-hidden",
        isOpen ? "w-64" : "w-0"
      )}
    >
      <div className="flex h-16 items-center justify-center border-b px-2 sm:px-4 min-w-0">
        {isOpen ? (
          <motion.h1 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg sm:text-xl font-bold text-primary whitespace-nowrap"
          >
            SegurançaPro
          </motion.h1>
        ) : (
          <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
        )}
      </div>

      <nav className="flex-grow space-y-1 p-2 min-w-0">
        {navItems.map((item) => (
          <Button
            key={item.name}
            variant={location.pathname === `/${item.path}` ? 'secondary' : 'ghost'}
            className={cn(
              "w-full justify-start transition-all duration-200",
              isOpen ? "pl-2 sm:pl-3" : "pl-0 justify-center"
            )}
            onClick={() => handleItemClick(item.path, item.description)}
            onMouseEnter={() => handleMouseEnter(isOpen ? item.description : item.name)}
            aria-label={item.description}
          >
            <item.icon className={cn("h-4 w-4 sm:h-5 sm:w-5", isOpen ? "mr-2 sm:mr-3" : "mx-auto")} />
            {isOpen && <span className="truncate text-xs sm:text-sm">{item.name}</span>}
          </Button>
        ))}
      </nav>

      <div className="mt-auto border-t p-2 min-w-0">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start transition-all duration-200",
            isOpen ? "pl-2 sm:pl-3" : "pl-0 justify-center"
          )}
          onClick={handleLogoutClick}
          onMouseEnter={() => handleMouseEnter(isOpen ? "Sair do sistema" : "Sair")}
          aria-label="Sair do sistema"
        >
          <LogOut className={cn("h-4 w-4 sm:h-5 sm:w-5", isOpen ? "mr-2 sm:mr-3" : "mx-auto")} />
          {isOpen && <span className="truncate text-xs sm:text-sm">Sair</span>}
        </Button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
