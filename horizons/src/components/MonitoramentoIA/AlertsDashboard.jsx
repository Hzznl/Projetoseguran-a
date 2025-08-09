import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AlertsDashboard = ({ alerts }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          Alertas em Tempo Real
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 h-96 overflow-y-auto">
          <AnimatePresence>
            {alerts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-full"
              >
                <p className="text-muted-foreground">Nenhum alerta no momento.</p>
              </motion.div>
            )}
            {alerts.map((alert) => (
              <motion.div
                key={alert.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                className={`flex items-start gap-4 p-3 rounded-lg ${
                  alert.severity === 'high' ? 'bg-destructive/15' :
                  alert.severity === 'medium' ? 'bg-yellow-500/15' :
                  'bg-blue-500/15'
                }`}
              >
                <img
                  src={alert.image}
                  alt={`Alerta de ${alert.type}`}
                  className="w-16 h-16 rounded-md object-contain bg-white p-1"
                  onError={(e) => {
                    // Fallback para imagens que não carregam
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150?text=EPI';
                  }}
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <Badge variant={
                      alert.severity === 'high' ? 'destructive' :
                      alert.severity === 'medium' ? 'warning' :
                      'outline'
                    }>
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {alert.severity === 'high' ? 'Alto Risco' :
                       alert.severity === 'medium' ? 'Médio Risco' :
                       'Baixo Risco'}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {alert.time.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="font-semibold mt-1">{alert.type}</p>
                  {alert.area && <p className="text-sm text-muted-foreground"><strong>Área:</strong> {alert.area}</p>}
                  {alert.message && <p className="text-sm text-muted-foreground">{alert.message}</p>}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsDashboard;