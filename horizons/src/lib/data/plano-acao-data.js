export const planoAcaoData = {
  setores: [
    'Produção', 'Manutenção', 'Administrativo', 'Logística', 
    'Qualidade', 'RH', 'TI', 'Financeiro'
  ],

  responsaveis: [
    'João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa',
    'Carlos Ferreira', 'Lucia Rodrigues', 'Roberto Almeida'
  ],

  prioridades: [
    { value: 'alta', label: 'Alta', color: 'bg-red-100 text-red-800' },
    { value: 'media', label: 'Média', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'baixa', label: 'Baixa', color: 'bg-green-100 text-green-800' }
  ],

  statusOptions: [
    { value: 'pendente', label: 'Pendente', color: 'bg-orange-100 text-orange-800' },
    { value: 'em_andamento', label: 'Em Andamento', color: 'bg-blue-100 text-blue-800' },
    { value: 'concluida', label: 'Concluída', color: 'bg-green-100 text-green-800' },
    { value: 'atrasada', label: 'Atrasada', color: 'bg-red-100 text-red-800' }
  ],

  tiposAcao: [
    'Corretiva', 'Preventiva', 'Melhoria', 'Emergencial'
  ],

  riscosRelacionados: [
    'Lesão por contato com partes móveis',
    'Lesão grave por queda',
    'Lesão por esforço repetitivo',
    'Intoxicação ou queimadura',
    'Exposição a ruído excessivo',
    'Exposição a vibrações'
  ],

  acoes: [
    {
      id: 1,
      titulo: 'Instalação de proteções nas máquinas',
      descricao: 'Instalar proteções adequadas em todas as máquinas da linha de produção',
      setor: 'Produção',
      responsavel: 'João Silva',
      prioridade: 'alta',
      status: 'em_andamento',
      prazo: '2025-02-01',
      tipoAcao: 'Corretiva',
      riscoRelacionado: 'Lesão por contato com partes móveis',
      custoEstimado: 15000,
      dataInicio: '2025-01-15',
      progresso: 60,
      eficacia: null,
      observacoes: 'Aguardando aprovação do orçamento'
    },
    {
      id: 2,
      titulo: 'Treinamento de segurança em altura',
      descricao: 'Realizar treinamento específico para trabalho em altura',
      setor: 'Manutenção',
      responsavel: 'Maria Santos',
      prioridade: 'alta',
      status: 'pendente',
      prazo: '2025-02-03',
      tipoAcao: 'Preventiva',
      riscoRelacionado: 'Lesão grave por queda',
      custoEstimado: 5000,
      dataInicio: null,
      progresso: 0,
      eficacia: null,
      observacoes: 'Agendamento pendente com instrutor'
    },
    {
      id: 3,
      titulo: 'Adequação de mobiliário ergonômico',
      descricao: 'Substituir mobiliário inadequado por versões ergonômicas',
      setor: 'Administrativo',
      responsavel: 'Pedro Oliveira',
      prioridade: 'media',
      status: 'concluida',
      prazo: '2025-01-20',
      tipoAcao: 'Melhoria',
      riscoRelacionado: 'Lesão por esforço repetitivo',
      custoEstimado: 8000,
      dataInicio: '2025-01-05',
      progresso: 100,
      eficacia: 85,
      observacoes: 'Implementação bem-sucedida, funcionários satisfeitos'
    },
    {
      id: 4,
      titulo: 'Instalação de sistema de ventilação',
      descricao: 'Implementar sistema de ventilação forçada na área de produtos químicos',
      setor: 'Logística',
      responsavel: 'Ana Costa',
      prioridade: 'alta',
      status: 'concluida',
      prazo: '2025-01-25',
      tipoAcao: 'Corretiva',
      riscoRelacionado: 'Intoxicação ou queimadura',
      custoEstimado: 25000,
      dataInicio: '2025-01-10',
      progresso: 100,
      eficacia: 92,
      observacoes: 'Sistema funcionando perfeitamente, redução significativa de exposição'
    },
    {
      id: 5,
      titulo: 'Substituição de EPIs inadequados',
      descricao: 'Renovar equipamentos de proteção individual desgastados',
      setor: 'Produção',
      responsavel: 'Carlos Ferreira',
      prioridade: 'media',
      status: 'em_andamento',
      prazo: '2025-02-10',
      tipoAcao: 'Preventiva',
      riscoRelacionado: 'Exposição a ruído excessivo',
      custoEstimado: 12000,
      dataInicio: '2025-01-20',
      progresso: 40,
      eficacia: null,
      observacoes: 'Processo de cotação em andamento'
    }
  ]
}; 