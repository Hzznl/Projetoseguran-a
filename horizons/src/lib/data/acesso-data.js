
import { getColaboradorById, colaboradoresData } from './colaboradores-data';
import { epiData } from './epi-data';

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
    const epiInfo = epiData.find(e => e.id === epiId);
    if (!epiInfo) return null;

    const estaUsando = Math.random() > 0.1; 
    
    return { 
      epi: epiInfo, 
      estaUsando, 
      validacao: { status: epiInfo.status, mensagem: epiInfo.statusMensagem }
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
