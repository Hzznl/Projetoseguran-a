import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useSpeech } from "@/contexts/SpeechContext";
import { motion } from "framer-motion";
import { Moon, Sun, Trash2, Upload, Volume2, Link2Off as Volume2Off } from 'lucide-react';
import React, { useEffect, useState } from "react";

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const { toast } = useToast();
  const { isNarrationEnabled, toggleSpeech, speak } = useSpeech();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleThemeToggle = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    speak(!isDarkMode ? "Tema escuro ativado" : "Tema claro ativado");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma imagem válida",
        variant: "destructive"
      });
    }
  };

  const handleSaveLogo = () => {
    if (previewUrl) {
      localStorage.setItem('empresaLogo', previewUrl);
      window.dispatchEvent(new Event('logoUpdated'));
      toast({
        title: "Sucesso",
        description: "Logo atualizada com sucesso",
      });
      speak("Logo atualizada com sucesso");
    }
  };

  const handleRemoveLogo = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    localStorage.removeItem('empresaLogo');
    window.dispatchEvent(new Event('logoUpdated'));
    toast({
      title: "Logo Removida",
      description: "A logo foi removida com sucesso",
    });
    speak("Logo removida com sucesso");
  };

  const handleSpeechToggle = () => {
    toggleSpeech();
  };

  return (
    <div className="container py-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-3xl font-bold"
      >
        Configurações
      </motion.h1>

      <div className="grid gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Aparência</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  <Label htmlFor="theme-toggle">Tema Escuro</Label>
                </div>
                <Switch
                  id="theme-toggle"
                  checked={isDarkMode}
                  onCheckedChange={handleThemeToggle}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Acessibilidade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {isNarrationEnabled() ? <Volume2 className="h-5 w-5" /> : <Volume2Off className="h-5 w-5" />}
                  <Label htmlFor="speech-toggle">Narração</Label>
                </div>
                <Switch
                  id="speech-toggle"
                  checked={isNarrationEnabled()}
                  onCheckedChange={handleSpeechToggle}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Logo da Empresa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="flex-1"
                />
                <Button onClick={handleSaveLogo} className="gap-2">
                  <Upload className="h-4 w-4" />
                  Salvar
                </Button>
                {previewUrl && (
                  <Button variant="destructive" onClick={handleRemoveLogo} className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    Remover
                  </Button>
                )}
              </div>
              
              {previewUrl && (
                <div className="mt-4">
                  <p className="mb-2 text-sm text-muted-foreground">Prévia:</p>
                  <div className="flex h-20 items-center justify-center rounded-lg border bg-muted/40">
                    <img
                      src={previewUrl}
                      alt="Logo preview"
                      className="max-h-16 max-w-full object-contain"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
