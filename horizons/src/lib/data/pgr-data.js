export const pgrData = {
  setores: [
    'Produção', 'Manutenção', 'Administrativo', 'Logística', 
    'Qualidade', 'RH', 'TI', 'Financeiro'
  ],

  tiposRisco: [
    'Físico', 'Químico', 'Biológico', 'Ergonômico', 'Mecânico'
  ],

  classificacoes: [
    { value: 'baixo', label: 'Baixo Risco', color: 'bg-green-100 text-green-800' },
    { value: 'medio', label: 'Médio Risco', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'alto', label: 'Alto Risco', color: 'bg-red-100 text-red-800' }
  ],

  riscos: [
    {
      id: 1,
      setor: 'Produção',
      atividade: 'Operação de máquinas',
      perigo: 'Exposição a partes móveis',
      risco: 'Lesão por contato com partes móveis',
      tipoRisco: 'Mecânico',
      classificacao: 'alto',
      medidasExistentes: 'Proteções nas máquinas',
      medidasPropostas: 'Treinamento adicional',
      dataCadastro: '2024-01-15',
      status: 'pendente',
      evidencias: []
    },
    {
      id: 2,
      setor: 'Manutenção',
      atividade: 'Trabalho em altura',
      perigo: 'Queda de altura',
      risco: 'Lesão grave por queda',
      tipoRisco: 'Físico',
      classificacao: 'alto',
      medidasExistentes: 'Cintos de segurança',
      medidasPropostas: 'Plataforma elevatória',
      dataCadastro: '2024-01-10',
      status: 'concluido',
      evidencias: []
    },
    {
      id: 3,
      setor: 'Administrativo',
      atividade: 'Trabalho em computador',
      perigo: 'Postura inadequada',
      risco: 'Lesão por esforço repetitivo',
      tipoRisco: 'Ergonômico',
      classificacao: 'medio',
      medidasExistentes: 'Ajuste de mobiliário',
      medidasPropostas: 'Pausas programadas',
      dataCadastro: '2024-01-08',
      status: 'concluido',
      evidencias: []
    },
    {
      id: 4,
      setor: 'Logística',
      atividade: 'Manuseio de produtos químicos',
      perigo: 'Exposição a produtos químicos',
      risco: 'Intoxicação ou queimadura',
      tipoRisco: 'Químico',
      classificacao: 'alto',
      medidasExistentes: 'EPIs adequados',
      medidasPropostas: 'Ventilação forçada',
      dataCadastro: '2024-01-05',
      status: 'pendente',
      evidencias: []
    },
    {
      id: 5,
      setor: 'Qualidade',
      atividade: 'Inspeção de produtos',
      perigo: 'Exposição a agentes biológicos',
      risco: 'Contaminação biológica',
      tipoRisco: 'Biológico',
      classificacao: 'medio',
      medidasExistentes: 'Luvas e máscaras',
      medidasPropostas: 'Cabine de segurança biológica',
      dataCadastro: '2024-01-12',
      status: 'concluido',
      evidencias: []
    },
    {
      id: 6,
      setor: 'TI',
      atividade: 'Manutenção de servidores',
      perigo: 'Choque elétrico',
      risco: 'Lesão por eletricidade',
      tipoRisco: 'Físico',
      classificacao: 'alto',
      medidasExistentes: 'EPIs elétricos',
      medidasPropostas: 'Procedimentos de lockout/tagout',
      dataCadastro: '2024-01-20',
      status: 'pendente',
      evidencias: []
    },
    {
      id: 7,
      setor: 'RH',
      atividade: 'Atendimento ao público',
      perigo: 'Estresse ocupacional',
      risco: 'Síndrome de burnout',
      tipoRisco: 'Ergonômico',
      classificacao: 'baixo',
      medidasExistentes: 'Pausas regulares',
      medidasPropostas: 'Programa de bem-estar',
      dataCadastro: '2024-01-18',
      status: 'concluido',
      evidencias: []
    },
    {
      id: 8,
      setor: 'Financeiro',
      atividade: 'Controle de caixa',
      perigo: 'Assalto',
      risco: 'Lesão por violência',
      tipoRisco: 'Físico',
      classificacao: 'medio',
      medidasExistentes: 'Sistema de segurança',
      medidasPropostas: 'Treinamento de segurança',
      dataCadastro: '2024-01-22',
      status: 'pendente',
      evidencias: []
    },
    {
      id: 9,
      setor: 'Produção',
      atividade: 'Soldagem',
      perigo: 'Exposição a radiação UV',
      risco: 'Lesão ocular e cutânea',
      tipoRisco: 'Físico',
      classificacao: 'alto',
      medidasExistentes: 'Óculos e roupas de proteção',
      medidasPropostas: 'Cabine de soldagem isolada',
      dataCadastro: '2024-01-25',
      status: 'concluido',
      evidencias: []
    },
    {
      id: 10,
      setor: 'Manutenção',
      atividade: 'Limpeza de equipamentos',
      perigo: 'Exposição a produtos de limpeza',
      risco: 'Irritação respiratória',
      tipoRisco: 'Químico',
      classificacao: 'baixo',
      medidasExistentes: 'Ventilação adequada',
      medidasPropostas: 'Produtos menos tóxicos',
      dataCadastro: '2024-01-28',
      status: 'pendente',
      evidencias: []
    }
  ]
}; 