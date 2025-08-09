import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Video, VideoOff } from 'lucide-react';

// Tipos de EPIs para alertas aleatórios com mapeamento para as imagens
// Corrigindo os nomes dos arquivos com a extensão correta (.png.png)
const epiTypes = [
  { type: 'Capacete', severity: 'high', image: '/capacete.png' },
  { type: 'Luvas', severity: 'medium', image: '/luvas.png' }, // Agora usando a imagem correta de luvas
  { type: 'Colete', severity: 'high', image: '/colete.png' },
  { type: 'Protetor Auricular', severity: 'low', image: '/protetor.png' },
  { type: 'Óculos de Proteção', severity: 'medium', image: '/oculosdeprotecao.png' }, // Agora usando a imagem correta de óculos
  { type: 'Máscara', severity: 'medium', image: '/mascara.png' } // Agora usando a imagem correta de máscara
];

// Áreas para alertas aleatórios
const areas = ['Área A', 'Área B', 'Área C', 'Área D'];

const CameraFeed = ({ onCameraStateChange, onNewAlert }) => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const alertTimerRef = useRef(null);

  // Gera um alerta aleatório
  const generateRandomAlert = () => {
    const randomEpi = epiTypes[Math.floor(Math.random() * epiTypes.length)];
    const randomArea = areas[Math.floor(Math.random() * areas.length)];
    
    const alert = {
      type: randomEpi.type,
      severity: randomEpi.severity,
      area: randomArea,
      image: randomEpi.image,
      message: `Colaborador sem ${randomEpi.type.toLowerCase()} em ${randomArea}`
    };
    
    if (onNewAlert) {
      onNewAlert(alert);
    }
  };

  // Configura o timer para gerar alertas aleatórios quando a câmera estiver ligada
  useEffect(() => {
    if (onCameraStateChange) {
      onCameraStateChange(isCameraOn);
    }
    
    if (isCameraOn) {
      // Gera um alerta inicial após 2 segundos
      const initialTimeout = setTimeout(() => {
        generateRandomAlert();
        
        // Configura um intervalo para gerar alertas periódicos (entre 5 e 15 segundos)
        alertTimerRef.current = setInterval(() => {
          generateRandomAlert();
        }, Math.random() * 10000 + 5000);
      }, 2000);
      
      return () => {
        clearTimeout(initialTimeout);
        if (alertTimerRef.current) {
          clearInterval(alertTimerRef.current);
        }
      };
    } else {
      if (alertTimerRef.current) {
        clearInterval(alertTimerRef.current);
      }
    }
  }, [isCameraOn, onCameraStateChange, onNewAlert]);

  return (
    <div className="relative bg-black rounded-lg overflow-hidden w-full" style={{ paddingTop: '56.25%' }}>
      {isCameraOn ? (
        <video
          src="/demo.mp4.mp4"
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover"
        ></video>
      ) : (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-900 text-gray-400">
          <VideoOff size={48} />
          <p className="mt-2">Câmera Desligada</p>
        </div>
      )}

      <div className="absolute top-2 right-2 flex items-center gap-2">
        <Button
          size="icon"
          onClick={() => setIsCameraOn(true)}
          variant={isCameraOn ? 'destructive' : 'outline'}
          className="rounded-full"
          title="Ligar câmera"
        >
          <Video size={20} />
        </Button>
        <Button
          size="icon"
          onClick={() => setIsCameraOn(false)}
          variant={!isCameraOn ? 'destructive' : 'outline'}
          className="rounded-full"
          title="Desligar câmera"
        >
          <VideoOff size={20} />
        </Button>
      </div>

      {isCameraOn && (
        <>
          <div className="absolute bottom-2 left-2 flex items-center gap-2 bg-black/50 text-white px-2 py-1 rounded-md">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span>REC</span>
          </div>
          
          <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md text-xs">
            <span>Monitoramento IA ativo</span>
          </div>
        </>
      )}
    </div>
  );
};

export default CameraFeed;