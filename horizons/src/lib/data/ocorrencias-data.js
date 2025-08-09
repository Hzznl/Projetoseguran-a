export const tiposOcorrencia = [
  "Acidente de Trabalho",
  "Quase Acidente",
  "Condição Insegura",
  "Ato Inseguro",
  "Não Conformidade EPI",
  "Outros"
];

export const tiposOcorrenciaComCores = [
  { tipo: "Acidente de Trabalho", cor: "#ef4444" }, // vermelho
  { tipo: "Quase Acidente", cor: "#f97316" }, // laranja
  { tipo: "Condição Insegura", cor: "#eab308" }, // amarelo
  { tipo: "Ato Inseguro", cor: "#8b5cf6" }, // roxo
  { tipo: "Não Conformidade EPI", cor: "#06b6d4" }, // ciano
  { tipo: "Outros", cor: "#6b7280" } // cinza
];

export const gravidadeOptions = [
  { value: "baixa", label: "Baixa", color: "bg-green-500" },
  { value: "media", label: "Média", color: "bg-yellow-500" },
  { value: "alta", label: "Alta", color: "bg-red-500" }
];

export const getOcorrencias = () => {
  const savedOcorrencias = localStorage.getItem("ocorrencias");
  return savedOcorrencias ? JSON.parse(savedOcorrencias) : [];
};

export const saveOcorrencias = (ocorrencias) => {
  localStorage.setItem("ocorrencias", JSON.stringify(ocorrencias));
};
