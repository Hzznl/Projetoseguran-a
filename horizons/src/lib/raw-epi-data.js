
// Definindo URLs absolutas para as imagens
const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

console.log('Base URL:', baseUrl);

export const epiData = [
  { id: 1, nome: "Capacete de Segurança", tipo: "Proteção da Cabeça", ca: "12345", fabricante: "SuperSafe", validade: "2025-12-31", fotoUrl: `${baseUrl}/capacete.png` },
  { id: 2, nome: "Luvas de Proteção", tipo: "Proteção das Mãos", ca: "67890", fabricante: "HandGuard", validade: "2025-06-30", fotoUrl: `${baseUrl}/luvas.png` },
  { id: 3, nome: "Óculos de Segurança", tipo: "Proteção dos Olhos", ca: "13579", fabricante: "EyeShield", validade: "2025-08-15", fotoUrl: `${baseUrl}/oculosdeprotecao.png` },
  { id: 4, nome: "Máscara de Respiração Facial", tipo: "Proteção Facial e Respiratória", ca: "24680", fabricante: "WeldMaster", validade: "2025-01-20", fotoUrl: `${baseUrl}/mascara.png` },
  { id: 5, nome: "Avental de Raspa", tipo: "Proteção do Tronco", ca: "97531", fabricante: "BodySafe", validade: "2025-11-10", fotoUrl: `${baseUrl}/colete.png` },
  { id: 6, nome: "Cinto de Segurança (Altura)", tipo: "Proteção Contra Quedas", ca: "86420", fabricante: "SkyWalker", validade: "2025-07-01", fotoUrl: `${baseUrl}/cinto-seguranca-altura.png`},
  { id: 7, nome: "Protetor Auricular", tipo: "Proteção Auditiva", ca: "11223", fabricante: "SoundBlock", validade: "2025-03-25", fotoUrl: `${baseUrl}/protetor.png` },
  { id: 8, nome: "Botas de Segurança", tipo: "Proteção dos Pés", ca: "44556", fabricante: "FootGuard", validade: "2025-02-10", fotoUrl: `${baseUrl}/botina-seguranca.png` }
];
