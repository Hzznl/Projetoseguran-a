import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { motion } from 'framer-motion';
import { Camera, History, ShieldAlert, AlertCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Badge } from '../ui/badge';
import AlertsDashboard from './AlertsDashboard';
import CameraFeed from './CameraFeed';
import HistoryLog from './HistoryLog';

const MonitoramentoIA = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [history, setHistory] = useState([]);
  const [lastAlertTime, setLastAlertTime] = useState(null);

  const handleNewAlert = (alert) => {
    const newAlert = { ...alert, id: Date.now(), time: new Date() };
    setAlerts((prevAlerts) => [newAlert, ...prevAlerts].slice(0, 10)); // Mantém no máximo 10 alertas
    setHistory((prevHistory) => [newAlert, ...prevHistory]);
    setLastAlertTime(new Date());
  };

  // Limpa os alertas quando a câmera é desligada
  useEffect(() => {
    if (!isCameraActive) {
      // Mantém os alertas por 5 segundos antes de limpar
      const timer = setTimeout(() => {
        setAlerts([]);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isCameraActive]);

  return (
    <div className="container py-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center space-x-3">
          <Camera className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Monitoramento de EPI com IA</h1>
        </div>
        <div className="flex items-center justify-between">
          <p className="mt-2 text-muted-foreground">
            Detecção em tempo real de Equipamentos de Proteção Individual.
          </p>
          <div className="flex items-center gap-2">
            {isCameraActive ? (
              <Badge variant="success" className="flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Câmera Ativa
              </Badge>
            ) : (
              <Badge variant="secondary" className="flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-500"></span>
                </span>
                Câmera Inativa
              </Badge>
            )}
            {lastAlertTime && (
              <span className="text-xs text-muted-foreground">
                Último alerta: {lastAlertTime.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Feed da Câmera
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CameraFeed
                onCameraStateChange={setIsCameraActive}
                onNewAlert={handleNewAlert}
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Tabs defaultValue="alerts">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="alerts" className="relative">
                <ShieldAlert className="h-4 w-4 mr-2" />
                Alertas
                {alerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white">
                    {alerts.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="history">
                <History className="h-4 w-4 mr-2" />
                Histórico
                {history.length > 0 && (
                  <span className="ml-1 text-xs text-muted-foreground">({history.length})</span>
                )}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="alerts">
                <AlertsDashboard alerts={alerts} />
            </TabsContent>
            <TabsContent value="history">
                <HistoryLog history={history} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MonitoramentoIA;
