import AssistenteIA from "@/components/AssistenteIA";
import ColaboradoresList from "@/components/ColaboradoresList";
import ControleAcesso from "@/components/ControleAcesso";
import Dashboard from "@/components/Dashboard";
import EPIsList from "@/components/EPIsList";
import Header from "@/components/Header";
import LoginPage from "@/components/LoginPage";
import MonitoramentoIA from "@/components/MonitoramentoIA";
import OcorrenciasPage from "@/components/Ocorrencias";
import PGR from "@/components/PGR";
import PlanoAcao from "@/components/PlanoAcao";
import Settings from "@/components/Settings";
import Sidebar from "@/components/Sidebar";
import SistemaCompleto from "@/components/SistemaCompleto";
import { Toaster } from "@/components/ui/toaster";
import { SpeechProvider } from "@/contexts/SpeechContext";
import { loadEpiData } from "@/lib/data/epi-data";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [empresaLogoUrl, setEmpresaLogoUrl] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [episData, setEpisData] = useState([]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const savedLogo = localStorage.getItem('empresaLogo');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    if (loggedInUser) {
      setIsAuthenticated(true);
    }
    if (savedLogo) {
      setEmpresaLogoUrl(savedLogo);
    }

    // Carregar dados de EPIs
    const epis = loadEpiData();
    console.log('EPIs carregados:', epis);
    setEpisData(epis);

    const handleLogoUpdate = () => {
      const updatedLogo = localStorage.getItem('empresaLogo');
      setEmpresaLogoUrl(updatedLogo);
    };

    window.addEventListener('logoUpdated', handleLogoUpdate);
    return () => window.removeEventListener('logoUpdated', handleLogoUpdate);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser'); 
    setIsAuthenticated(false); 
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!isAuthenticated) {
    return (
      <SpeechProvider>
        <LoginPage onLoginSuccess={handleLoginSuccess} />
        <Toaster />
      </SpeechProvider>
    );
  }

  return (
    <SpeechProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Header 
            toggleSidebar={toggleSidebar} 
            logoUrl={empresaLogoUrl} 
            onLogout={handleLogout} 
            isAuthenticated={isAuthenticated}
          />
          <Sidebar 
            isOpen={isSidebarOpen} 
            onLogout={handleLogout}
          />

          {/* Overlay para mobile */}
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
              onClick={toggleSidebar}
            />
          )}

          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`pt-16 transition-all duration-300 ease-in-out ${
              isSidebarOpen 
                ? "md:pl-64" 
                : "pl-0"
            }`}
          >
            <div className="container mx-auto p-2 sm:p-4">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/colaboradores" element={<ColaboradoresList />} />
                <Route path="/epis" element={<EPIsList />} />
                <Route path="/sistema-completo" element={
                  (() => {
                    console.log('Renderizando SistemaCompleto com epis:', episData);
                    return <SistemaCompleto epis={episData} />;
                  })()
                } />
                <Route path="/controle-acesso" element={<ControleAcesso />} />
                <Route path="/ocorrencias" element={<OcorrenciasPage />} />
                <Route path="/monitoramento-ia" element={<MonitoramentoIA />} />
                <Route path="/pgr" element={<PGR />} />
                <Route path="/plano-acao" element={<PlanoAcao />} />
                <Route path="/assistente-ia" element={<AssistenteIA />} />
                <Route path="/configuracoes" element={<Settings />} />
              </Routes>
            </div>
          </motion.main>
          
          <Toaster />
        </div>
      </BrowserRouter>
    </SpeechProvider>
  );
}

export default App;
