
import { epiData as allEpiDataRaw } from './raw-epi-data';

export const epiData = allEpiDataRaw.map(epi => {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const dataValidade = new Date(epi.validade);
  let status = "válido";
  let mensagem = "CA válido";

  const diffTime = dataValidade - hoje;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (dataValidade < hoje) {
    status = "vencido";
    mensagem = `CA vencido em ${dataValidade.toLocaleDateString('pt-BR')}`;
  } else if (diffDays <= 30) {
    status = "próximo do vencimento";
    mensagem = `CA vence em ${diffDays} dia(s)`;
  }
  return { ...epi, status, statusMensagem: mensagem };
});


export let colaboradoresData = [
  { 
    id: 1, 
    nome: "Ana Silva", 
    cargo: "Operadora de Máquinas", 
    setor: "Produção A", 
    fotoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29172?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", 
    epiAssignados: [1, 2] 
  },
  { 
    id: 2, 
    nome: "Carlos Oliveira", 
    cargo: "Soldador", 
    setor: "Manutenção", 
    fotoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    epiAssignados: [3, 4, 5] 
  },
  { 
    id: 3, 
    nome: "Edivaldo Costa", 
    cargo: "Eletricista", 
    setor: "Infraestrutura",
    fotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", 
    epiAssignados: [1, 6, 7] 
  },
  { 
    id: 4, 
    nome: "Pedro Almeida", 
    cargo: "Auxiliar de Produção", 
    setor: "Produção B", 
    fotoUrl: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    epiAssignados: [1] 
  },
  { 
    id: 5, 
    nome: "Juliana Santos", 
    cargo: "Técnica de Segurança", 
    setor: "SESMT", 
    fotoUrl: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    epiAssignados: [] 
  }
];

if (typeof window !== 'undefined') {
  const savedColaboradores = localStorage.getItem("colaboradoresData");
  if (savedColaboradores) {
    colaboradoresData = JSON.parse(savedColaboradores);
  } else {
    localStorage.setItem("colaboradoresData", JSON.stringify(colaboradoresData));
  }
}

export const getColaboradorById = (id) => {
  return colaboradoresData.find(c => c.id === id);
};

export const verificarEPIsColaborador = (colaboradorId, epiAssignadosColaborador, allEPIs) => {
  const colaborador = getColaboradorById(colaboradorId);
  if (!colaborador) return { status: false, mensagem: "Colaborador não encontrado" };

  const episDoColaborador = epiAssignadosColaborador
    .map(epiId => allEPIs.find(e => e.id === epiId))
    .filter(Boolean);

  if (episDoColaborador.length === 0 && epiAssignadosColaborador.length > 0) {
     return { status: false, mensagem: "Alguns EPIs não foram encontrados na base de dados." };
  }
  
  if (episDoColaborador.length === 0 && epiAssignadosColaborador.length === 0) {
    return { status: true, mensagem: "Nenhum EPI requerido para este colaborador." };
  }

  for (const epi of episDoColaborador) {
    if (epi.status === "vencido") {
      return { status: false, mensagem: `EPI ${epi.nome} (CA: ${epi.ca}) está vencido.` };
    }
  }
  return { status: true, mensagem: "Todos os EPIs estão válidos." };
};


export const simularLeituraSensor = (colaboradorId) => {
  const colaborador = getColaboradorById(colaboradorId);
  if (!colaborador) return [];

  return colaborador.epiAssignados.map(epiId => {
    const epi = epiData.find(e => e.id === epiId);
    if (!epi) return null;

    const estaUsando = Math.random() > 0.1; 
    
    return { 
      epi, 
      estaUsando, 
      validacao: { status: epi.status, mensagem: epi.statusMensagem }
    };
  }).filter(Boolean);
};


export const autorizarAcesso = (colaboradorId, resultadosVerificacao) => {
  const colaborador = getColaboradorById(colaboradorId);
  if (!colaborador) {
    return { autorizado: false, mensagem: "Colaborador não encontrado." };
  }

  if (resultadosVerificacao.length === 0 && colaborador.epiAssignados.length > 0) {
    return { autorizado: false, mensagem: "Nenhum EPI detectado para o colaborador." };
  }
  
  if (resultadosVerificacao.length < colaborador.epiAssignados.length) {
     return { autorizado: false, mensagem: "Faltam EPIs obrigatórios para o colaborador." };
  }

  for (const resultado of resultadosVerificacao) {
    if (!resultado.estaUsando) {
      return { autorizado: false, mensagem: `EPI ${resultado.epi.nome} não detectado.` };
    }
    if (resultado.validacao.status === "vencido") {
      return { autorizado: false, mensagem: `CA do EPI ${resultado.epi.nome} está vencido.` };
    }
  }
  return { autorizado: true, mensagem: "Acesso autorizado. Todos os EPIs estão corretos." };
};

export const salvarRegistroAcesso = (colaboradorId, statusAcesso, epiVerificados) => {
  const registros = JSON.parse(localStorage.getItem("registrosAcesso")) || [];
  registros.push({
    id: Date.now(),
    colaboradorId,
    dataHora: new Date().toISOString(),
    statusAcesso,
    epiVerificados, 
  });
  localStorage.setItem("registrosAcesso", JSON.stringify(registros));
};

export const getRegistrosAcesso = () => {
  const registros = JSON.parse(localStorage.getItem("registrosAcesso")) || [];
  return registros.map(reg => ({
    ...reg,
    data: reg.dataHora 
  }));
};

export const rawEpiData = allEpiDataRaw;
