
let initialColaboradoresData = [
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

export let colaboradoresData = initialColaboradoresData;

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

export const updateColaboradoresData = (newData) => {
  colaboradoresData = newData;
  if (typeof window !== 'undefined') {
    localStorage.setItem("colaboradoresData", JSON.stringify(colaboradoresData));
  }
};
