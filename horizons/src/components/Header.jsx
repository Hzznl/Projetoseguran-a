
import React from 'react';
import { motion } from 'framer-motion';
import { Menu, ShieldCheck, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = ({ toggleSidebar, logoUrl, onLogout, isAuthenticated }) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-card px-2 sm:px-4 md:px-6 shadow-sm"
    >
      <div className="flex items-center">
        {isAuthenticated && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className="mr-2 md:hidden hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        )}
        {logoUrl ? (
          <img 
            src={logoUrl} 
            alt="Logo da Empresa" 
            className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
              // Fallback to default logo
              const defaultLogo = document.createElement('div');
              defaultLogo.className = 'flex items-center gap-2';
              defaultLogo.innerHTML = `
                <svg viewBox="0 0 24 24" class="h-6 w-6 sm:h-7 sm:w-7 text-primary">
                  <path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-2.98 8.64-7 9.94-4.02-1.3-7-5.27-7-9.94V6.3l7-3.12z"/>
                </svg>
                <h1 class="text-lg sm:text-xl font-bold text-primary">SafetyGuard</h1>
              `;
              e.target.parentNode.appendChild(defaultLogo);
            }}
          />
        ) : (
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
            <h1 className="text-lg sm:text-xl font-bold text-primary">SafetyGuard</h1>
          </div>
        )}
      </div>
      {isAuthenticated && (
         <Button variant="ghost" onClick={onLogout} className="gap-1 sm:gap-2">
           <LogOut className="h-4 w-4" />
           <span className="hidden sm:inline">Sair</span>
         </Button>
      )}
    </motion.header>
  );
};

export default Header;
