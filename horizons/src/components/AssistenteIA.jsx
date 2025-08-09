import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { askOpenRouter } from "@/lib/askOpenRouter";
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Send, Sparkles, User } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const predefinedResponses = {
  "olá": "Olá! Sou o Assistente IA da SegurançaPro. Como posso te ajudar com suas dúvidas sobre segurança do trabalho, NRs, EPIs, treinamentos ou riscos?",
  "oi": "Oi! Estou à disposição para esclarecer suas questões sobre segurança ocupacional. Pergunte sobre NRs, treinamentos, EPIs ou riscos específicos.",
  "qual epi usar para altura?": "Para trabalhos em altura (NR-35), é essencial usar cinto de segurança tipo paraquedista, talabarte com absorvedor de energia, capacete com jugular, e possivelmente linha de vida ou trava-quedas. Luvas e óculos de proteção também são recomendados.",
  "o que é cipa?": "CIPA significa Comissão Interna de Prevenção de Acidentes e de Assédio (NR-5). É um grupo formado por representantes do empregador e dos empregados que tem como objetivo a prevenção de acidentes e doenças decorrentes do trabalho, além de promover um ambiente de trabalho saudável e seguro.",
  "quais são os principais tipos de epi?": "Os principais tipos de EPI (Equipamento de Proteção Individual) incluem: proteção para cabeça (capacetes), olhos e face (óculos, protetores faciais), ouvidos (protetores auriculares), respiratória (respiradores, máscaras), tronco (coletes, aventais), membros superiores (luvas, mangotes), membros inferiores (calçados de segurança, perneiras), e proteção contra quedas (cintos de segurança, talabartes, trava-quedas).",
  "como armazenar epi?": "Os EPIs devem ser armazenados em local limpo, seco, arejado, protegido da luz solar direta, umidade excessiva e de substâncias químicas agressivas. Siga sempre as recomendações do fabricante e as orientações da NR-6.",
  "quando devo substituir um epi?": "Um EPI deve ser substituído imediatamente quando estiver danificado, desgastado, sujo a ponto de não poder ser limpo, ou quando expirar o prazo de validade indicado pelo fabricante ou o CA (Certificado de Aprovação). Também deve ser substituído após um incidente que possa ter comprometido sua integridade ou eficácia.",
  "obrigado": "De nada! Se tiver mais alguma dúvida sobre segurança do trabalho, NRs, treinamentos ou riscos, é só perguntar.",
  "ajuda": "Claro! Em que posso te ajudar sobre segurança do trabalho, normas regulamentadoras, EPIs, treinamentos ou análise de riscos?",
  "segurança do trabalho": "A Segurança e Saúde no Trabalho (SST) é um conjunto de normas, medidas técnicas, educacionais, médicas e psicológicas, empregadas para prevenir acidentes e doenças ocupacionais, eliminando condições inseguras do ambiente de trabalho e instruindo ou convencendo as pessoas da implantação de práticas preventivas.",
  "quais meus direitos como trabalhador sobre epi?": "Conforme a NR-6, você tem o direito de: receber gratuitamente os EPIs adequados ao risco da sua atividade e em perfeito estado de conservação e funcionamento; ser treinado sobre o uso correto, guarda, conservação e higienização; e exigir que o EPI possua Certificado de Aprovação (CA) válido.",
  "o que é nr-10?": "A NR-10 estabelece os requisitos e condições mínimas para a implementação de medidas de controle e sistemas preventivos, de forma a garantir a segurança e a saúde dos trabalhadores que, direta ou indiretamente, interajam em instalações elétricas e serviços com eletricidade.",
  "fale sobre a nr-12": "A NR-12 trata da segurança no trabalho em máquinas e equipamentos. Ela estabelece medidas de proteção para garantir a integridade física dos trabalhadores e prevenir acidentes, definindo referências técnicas, princípios fundamentais e medidas de proteção a serem observadas na concepção, fabricação, importação, comercialização, exposição e cessão a qualquer título, em todas as atividades econômicas.",
  "o que é pgr?": "PGR significa Programa de Gerenciamento de Riscos (NR-1). É um documento que visa identificar perigos, avaliar riscos ocupacionais e estabelecer medidas de prevenção para eliminá-los, reduzi-los ou controlá-los. Ele substituiu o PPRA.",
  "quais os principais riscos no ambiente de trabalho?": "Os riscos ambientais são classificados em: Riscos Físicos (ruído, calor, frio, pressões, umidade, radiações ionizantes e não ionizantes, vibrações); Riscos Químicos (poeiras, fumos, névoas, neblinas, gases, vapores); Riscos Biológicos (vírus, bactérias, protozoários, fungos, parasitas, bacilos); Riscos Ergonômicos (esforço físico intenso, levantamento e transporte manual de peso, postura inadequada, controle rígido de produtividade, monotonia e repetitividade); e Riscos de Acidentes (arranjo físico inadequado, máquinas e equipamentos sem proteção, ferramentas inadequadas ou defeituosas, eletricidade, probabilidade de incêndio ou explosão, armazenamento inadequado).",
  "qual a importância do treinamento de segurança?": "Os treinamentos de segurança são fundamentais para capacitar os trabalhadores a identificar riscos, utilizar corretamente os EPIs, seguir procedimentos seguros, atuar em situações de emergência e contribuir para um ambiente de trabalho mais seguro. Eles são obrigatórios por diversas NRs.",
  "o que é nr-33?": "A NR-33 estabelece os requisitos mínimos para identificação de espaços confinados, seu reconhecimento, avaliação, monitoramento e controle dos riscos existentes, de forma a garantir permanentemente a segurança e saúde dos trabalhadores que interagem direta ou indiretamente nestes espaços.",
  "o que é nr-35?": "A NR-35 estabelece os requisitos mínimos e as medidas de proteção para o trabalho em altura, envolvendo o planejamento, a organização e a execução, de forma a garantir a segurança e a saúde dos trabalhadores envolvidos direta ou indiretamente com esta atividade.",
  "como funciona a análise de risco?": "A Análise de Risco é um processo que envolve a identificação dos perigos presentes no ambiente de trabalho, a avaliação da probabilidade e da severidade das possíveis consequências (danos à saúde, lesões), e a determinação de medidas de controle para eliminar ou reduzir esses riscos a níveis aceitáveis.",
  "o que é ordem de serviço de segurança?": "A Ordem de Serviço (OS) sobre segurança e saúde no trabalho, conforme a NR-1, tem o objetivo de informar os trabalhadores sobre os riscos profissionais que possam originar-se nos locais de trabalho, os meios para prevenir e limitar tais riscos, as medidas adotadas pela empresa e os procedimentos a serem adotados em situação de emergência.",
  "quais são as normas regulamentadoras?": "As Normas Regulamentadoras (NRs) são disposições complementares ao Capítulo V (Da Segurança e da Medicina do Trabalho) do Título II da Consolidação das Leis do Trabalho (CLT). Elas consistem em obrigações, direitos e deveres a serem cumpridos por empregadores e trabalhadores com o objetivo de garantir trabalho seguro e sadio, prevenindo a ocorrência de doenças e acidentes de trabalho. Existem diversas NRs, cada uma tratando de um tema específico, como NR-1 (Disposições Gerais e Gerenciamento de Riscos Ocupacionais), NR-5 (CIPA), NR-6 (EPI), NR-10 (Eletricidade), NR-12 (Máquinas e Equipamentos), NR-33 (Espaços Confinados), NR-35 (Trabalho em Altura), entre outras.",
  "treinamento de primeiros socorros": "O treinamento de primeiros socorros é vital para capacitar os trabalhadores a agir corretamente em situações de emergência, prestando os cuidados iniciais a uma vítima de acidente ou mal súbito até a chegada de socorro especializado. A NR-7 (PCMSO) exige que empresas garantam essa capacitação.",
  "riscos ergonômicos": "Riscos ergonômicos são aqueles que podem afetar a saúde do trabalhador devido a fatores como levantamento de peso, postura inadequada, movimentos repetitivos, jornadas de trabalho exaustivas, monotonia, ou organização do trabalho inadequada. A NR-17 trata especificamente da ergonomia.",
  "prevenção de incêndios": "A prevenção de incêndios envolve medidas como a instalação de equipamentos de combate a incêndio (extintores, hidrantes, sprinklers), sinalização de emergência, rotas de fuga desobstruídas, treinamentos de brigada de incêndio (NR-23), e a correta manipulação e armazenamento de materiais inflamáveis.",
  "o que é pcmso?": "PCMSO significa Programa de Controle Médico de Saúde Ocupacional (NR-7). Seu objetivo é promover e preservar a saúde do conjunto dos seus trabalhadores, através da realização de exames médicos admissionais, periódicos, de retorno ao trabalho, de mudança de riscos ocupacionais e demissionais."
};

const normalizeText = (text) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
    .replace(/[^\w\s]/gi, '') 
    .replace(/\s+/g, ' ') 
    .trim();
};

const getAIResponse = (message) => {
  const normalizedUserMessage = normalizeText(message);
  const userMessageWords = new Set(normalizedUserMessage.split(' ').filter(Boolean));

  let bestMatch = null;
  let highestScore = 0;
  const MIN_MATCH_SCORE = 1.5; 
  const NR_FALLBACK_SCORE_THRESHOLD = 2.0;

  for (const key in predefinedResponses) {
    const normalizedKey = normalizeText(key);
    const keyWords = new Set(normalizedKey.split(' ').filter(Boolean));

    if (keyWords.size === 0) continue;

    const commonWords = new Set([...userMessageWords].filter(word => keyWords.has(word)));
    
    let score = commonWords.size;

    if (score === 0 && normalizedUserMessage !== normalizedKey) continue;

    if (keyWords.size > 0) {
      score += (commonWords.size / keyWords.size); 
    }
    if (userMessageWords.size > 0) {
        score += (commonWords.size / userMessageWords.size);
    }

    if (normalizedUserMessage === normalizedKey && normalizedUserMessage.length > 0) {
        score += 10; 
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = predefinedResponses[key];
    }
  }
  
  if (highestScore < NR_FALLBACK_SCORE_THRESHOLD && (normalizedUserMessage.includes("nr ") || normalizedUserMessage.startsWith("nr") && normalizedUserMessage.length <= 5) ) {
    const nrMatch = normalizedUserMessage.match(/nr\s*(\d+)/);
    if (nrMatch && nrMatch[1]) {
        const nrNumber = nrMatch[1];
        for (const keyInPredefined in predefinedResponses) {
            if (normalizeText(keyInPredefined).includes(`nr ${nrNumber}`)) {
                return predefinedResponses[keyInPredefined];
            }
        }
        return `Você perguntou sobre a NR ${nrNumber}. Temos informações gerais sobre NRs e algumas específicas como NR-1, NR-5, NR-6, etc. Poderia especificar qual aspecto da NR ${nrNumber} te interessa ou se é outra NR?`;
    }
    return "Você perguntou sobre uma NR. Temos informações sobre NR-1, NR-5, NR-6, NR-7, NR-10, NR-12, NR-17, NR-23, NR-33 e NR-35. Qual delas te interessa ou qual sua dúvida específica?";
  }

  if (bestMatch && highestScore >= MIN_MATCH_SCORE) {
    return bestMatch;
  }

  return "Desculpe, ainda estou aprendendo e não tenho uma resposta exata para isso. Tente reformular sua pergunta ou perguntar sobre temas como EPIs, CIPA, NRs específicas (como NR-10, NR-12, NR-35), tipos de riscos (físicos, químicos, ergonômicos), treinamentos ou primeiros socorros.";
};


const AssistenteIA = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('assistenteIA-messages');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'initial',
            text: 'Olá! Sou seu assistente virtual de SegurançaPro. Como posso te ajudar hoje sobre segurança, NRs, EPIs, treinamentos ou riscos?',
            sender: 'ai'
          }
        ];
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    localStorage.setItem('assistenteIA-messages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newMessage = { id: Date.now().toString(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const aiResponseText = await askOpenRouter(inputValue);
      const aiMessage = { id: (Date.now() + 1).toString(), text: aiResponseText, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      toast({
        title: "Nova mensagem do Assistente",
        description: "O assistente IA respondeu à sua pergunta.",
      });
    } catch (err) {
      setIsTyping(false);
      toast({
        title: "Erro",
        description: "Não foi possível obter resposta da IA.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto py-6 flex flex-col h-[calc(100vh-8rem)]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center space-x-3">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Assistente IA</h1>
        </div>
        <p className="mt-2 text-muted-foreground">
          Tire suas dúvidas sobre segurança do trabalho, Normas Regulamentadoras, EPIs, treinamentos e riscos com nosso assistente virtual.
        </p>
      </motion.div>

      <Card className="flex-grow flex flex-col shadow-xl overflow-hidden glass-card border-0 bg-card/80">
        <CardHeader className="bg-primary/10">
          <CardTitle className="flex items-center text-primary">
            <Bot className="mr-2 h-6 w-6" />
            Chat com SegurançaPro AI
          </CardTitle>
          <CardDescription>Pergunte sobre NRs, EPIs, PGR, CIPA, PCMSO, treinamentos, riscos, etc.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow p-4 space-y-4 overflow-y-auto">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                layout
                initial={{ opacity: 0, y: msg.sender === 'user' ? 10 : -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "flex items-end space-x-2 max-w-[80%]",
                  msg.sender === 'user'
                    ? 'ml-auto flex-row justify-end'
                    : 'mr-auto'
                )}
              >
                {msg.sender === 'ai' && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    <Bot size={18} />
                  </div>
                )}
                {msg.sender === 'user' && (
                  <>
                    <div
                      className={cn(
                        "p-3 rounded-xl shadow-md",
                        'bg-primary text-primary-foreground rounded-br-none'
                      )}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    </div>
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                      <User size={18} />
                    </div>
                  </>
                )}
                {msg.sender === 'ai' && (
                  <div
                    className={cn(
                      "p-3 rounded-xl shadow-md",
                      'bg-secondary text-secondary-foreground rounded-bl-none'
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-end space-x-2 mr-auto"
            >
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <Bot size={18} />
              </div>
              <div className="p-3 rounded-lg bg-secondary text-secondary-foreground shadow-md rounded-bl-none">
                <motion.div
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="flex space-x-1 items-center"
                  >
                    <span className="h-2 w-2 bg-primary/70 rounded-full animate-pulse"></span>
                    <span className="h-2 w-2 bg-primary/70 rounded-full animate-pulse delay-150"></span>
                    <span className="h-2 w-2 bg-primary/70 rounded-full animate-pulse delay-300"></span>
                  </motion.div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>
        <form onSubmit={handleSendMessage} className="p-4 border-t bg-background/50">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Digite sua pergunta aqui..."
              className="flex-grow input-animated bg-transparent placeholder-muted-foreground"
              aria-label="Caixa de entrada de mensagem"
            />
            <Button type="submit" size="icon" className="button-gradient" aria-label="Enviar mensagem">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AssistenteIA;
