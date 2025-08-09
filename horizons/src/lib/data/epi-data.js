
import { epiData as allEpiDataRaw } from '@/lib/raw-epi-data';

console.log('Dados EPI carregados:', allEpiDataRaw);

export const epiData = allEpiDataRaw.map(epi => {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const dataValidade = new Date(epi.validade);
  dataValidade.setHours(0, 0, 0, 0);
  
  let status = "válido";
  let mensagem = "CA válido";

  const diffTime = dataValidade.getTime() - hoje.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffTime < 0) {
    status = "vencido";
    mensagem = `CA vencido em ${dataValidade.toLocaleDateString('pt-BR')}`;
  } else if (diffDays <= 30) {
    status = "próximo do vencimento";
    mensagem = `CA vence em ${diffDays} dia(s)`;
  }

  return { 
    ...epi, 
    status, 
    statusMensagem: mensagem,
    diasParaVencer: diffDays
  };
});

export const getEpiById = (id) => {
  return epiData.find(e => e.id === id);
};

export const updateEpiData = (newEpiList) => {
  localStorage.setItem("epiDataSafety", JSON.stringify(newEpiList));
  return newEpiList;
};

export const loadEpiData = () => {
  const savedEpis = localStorage.getItem("epiDataSafety");
  if (!savedEpis) return epiData;
  
  const parsedEpis = JSON.parse(savedEpis);
  return parsedEpis.map(epi => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataValidade = new Date(epi.validade);
    dataValidade.setHours(0, 0, 0, 0);
    
    const diffTime = dataValidade.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let status = "válido";
    let mensagem = "CA válido";

    if (diffTime < 0) {
      status = "vencido";
      mensagem = `CA vencido em ${dataValidade.toLocaleDateString('pt-BR')}`;
    } else if (diffDays <= 30) {
      status = "próximo do vencimento";
      mensagem = `CA vence em ${diffDays} dia(s)`;
    }

    return {
      ...epi,
      status,
      statusMensagem: mensagem,
      diasParaVencer: diffDays
    };
  });
};
