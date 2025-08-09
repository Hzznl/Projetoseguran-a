import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Video, Award, Users, Play, CheckCircle, Clock, Star, Download, Share2, Eye, BarChart3 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';

const ModuloTreinamentos = () => {
  const [cursos, setCursos] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  const [certificacoes, setCertificacoes] = useState([]);
  const [quizAtivo, setQuizAtivo] = useState(null);
  const [respostasQuiz, setRespostasQuiz] = useState({});
  const [filtroCurso, setFiltroCurso] = useState('todos');
  const [novoCurso, setNovoCurso] = useState({
    titulo: '',
    descricao: '',
    categoria: 'geral',
    duracao: 30,
    nivel: 'basico',
    videoUrl: '',
    materiais: []
  });

  // Dados simulados de cursos
  useEffect(() => {
    const cursosData = [
      {
        id: 1,
        titulo: 'Uso Correto de EPIs',
        descricao: 'Aprenda a utilizar corretamente todos os tipos de EPIs',
        categoria: 'epis',
        duracao: 45,
        nivel: 'basico',
        videoUrl: 'https://example.com/video1',
        materiais: ['Manual EPIs.pdf', 'Checklist.pdf'],
        progresso: 75,
        certificado: true,
        colaboradores: 45,
        avaliacao: 4.8
      },
      {
        id: 2,
        titulo: 'Proteção Respiratória',
        descricao: 'Treinamento específico para equipamentos respiratórios',
        categoria: 'respiratoria',
        duracao: 60,
        nivel: 'intermediario',
        videoUrl: 'https://example.com/video2',
        materiais: ['Guia Respiratoria.pdf', 'Teste Vazamento.pdf'],
        progresso: 30,
        certificado: true,
        colaboradores: 23,
        avaliacao: 4.6
      },
      {
        id: 3,
        titulo: 'Proteção para Cabeça',
        descricao: 'Capacetes, toucas e outros equipamentos de proteção',
        categoria: 'cabeca',
        duracao: 30,
        nivel: 'basico',
        videoUrl: 'https://example.com/video3',
        materiais: ['Manual Capacetes.pdf'],
        progresso: 100,
        certificado: true,
        colaboradores: 67,
        avaliacao: 4.9
      },
      {
        id: 4,
        titulo: 'Proteção Auditiva',
        descricao: 'Protetores auriculares e sua importância',
        categoria: 'auditiva',
        duracao: 25,
        nivel: 'basico',
        videoUrl: 'https://example.com/video4',
        materiais: ['Guia Auditiva.pdf'],
        progresso: 0,
        certificado: false,
        colaboradores: 12,
        avaliacao: 0
      }
    ];

    const colaboradoresData = [
      { id: 1, nome: 'João Silva', cargo: 'Operador', cursos: 3, certificados: 2, progresso: 85 },
      { id: 2, nome: 'Maria Santos', cargo: 'Técnico', cursos: 4, certificados: 4, progresso: 100 },
      { id: 3, nome: 'Pedro Costa', cargo: 'Supervisor', cursos: 2, certificados: 1, progresso: 60 },
      { id: 4, nome: 'Ana Oliveira', cargo: 'Operador', cursos: 1, certificados: 0, progresso: 25 }
    ];

    const certificacoesData = [
      { id: 1, colaborador: 'João Silva', curso: 'Uso Correto de EPIs', data: '2024-01-15', validade: '2025-01-15', status: 'valido' },
      { id: 2, colaborador: 'Maria Santos', curso: 'Proteção Respiratória', data: '2024-02-20', validade: '2025-02-20', status: 'valido' },
      { id: 3, colaborador: 'Pedro Costa', curso: 'Proteção para Cabeça', data: '2023-12-10', validade: '2024-12-10', status: 'valido' }
    ];

    setCursos(cursosData);
    setColaboradores(colaboradoresData);
    setCertificacoes(certificacoesData);
  }, []);

  const quizData = {
    id: 1,
    titulo: 'Quiz: Uso Correto de EPIs',
    perguntas: [
      {
        id: 1,
        pergunta: 'Qual EPI é obrigatório em áreas com risco de queda?',
        opcoes: ['Capacete', 'Cinto de segurança', 'Ambos', 'Nenhum'],
        resposta: 2
      },
      {
        id: 2,
        pergunta: 'Qual a frequência recomendada para troca de filtros respiratórios?',
        opcoes: ['Diariamente', 'Semanalmente', 'Mensalmente', 'Conforme uso'],
        resposta: 3
      },
      {
        id: 3,
        pergunta: 'O que fazer quando um EPI está danificado?',
        opcoes: ['Continuar usando', 'Descartar imediatamente', 'Reparar sozinho', 'Guardar para depois'],
        resposta: 1
      }
    ]
  };

  const iniciarQuiz = () => {
    setQuizAtivo(quizData);
    setRespostasQuiz({});
  };

  const responderQuiz = (perguntaId, resposta) => {
    setRespostasQuiz(prev => ({
      ...prev,
      [perguntaId]: resposta
    }));
  };

  const finalizarQuiz = () => {
    const acertos = Object.keys(respostasQuiz).filter(perguntaId => {
      const pergunta = quizAtivo.perguntas.find(p => p.id === parseInt(perguntaId));
      return pergunta && respostasQuiz[perguntaId] === pergunta.resposta;
    }).length;

    const percentual = (acertos / quizAtivo.perguntas.length) * 100;
    
    if (percentual >= 70) {
      // Gerar certificado
      const novaCertificacao = {
        id: Date.now(),
        colaborador: 'Usuário Atual',
        curso: quizAtivo.titulo,
        data: new Date().toISOString().split('T')[0],
        validade: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'valido'
      };
      setCertificacoes(prev => [novaCertificacao, ...prev]);
    }

    setQuizAtivo(null);
    setRespostasQuiz({});
  };

  const adicionarCurso = () => {
    if (novoCurso.titulo && novoCurso.descricao) {
      const curso = {
        id: Date.now(),
        ...novoCurso,
        progresso: 0,
        certificado: false,
        colaboradores: 0,
        avaliacao: 0
      };
      setCursos(prev => [curso, ...prev]);
      setNovoCurso({
        titulo: '',
        descricao: '',
        categoria: 'geral',
        duracao: 30,
        nivel: 'basico',
        videoUrl: '',
        materiais: []
      });
    }
  };

  const cursosFiltrados = cursos.filter(curso => {
    if (filtroCurso === 'todos') return true;
    return curso.categoria === filtroCurso;
  });

  const getCorNivel = (nivel) => {
    switch (nivel) {
      case 'basico': return 'bg-green-100 text-green-800';
      case 'intermediario': return 'bg-yellow-100 text-yellow-800';
      case 'avancado': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getCorStatus = (status) => {
    switch (status) {
      case 'valido': return 'bg-green-100 text-green-800';
      case 'expirado': return 'bg-red-100 text-red-800';
      case 'proximo': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Módulo de Treinamentos</h2>
          <p className="text-muted-foreground">Sistema completo de capacitação e certificação</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {colaboradores.length} colaboradores
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="cursos" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="cursos">Cursos</TabsTrigger>
          <TabsTrigger value="certificacoes">Certificações</TabsTrigger>
          <TabsTrigger value="colaboradores">Colaboradores</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="cursos" className="space-y-4">
          <div className="flex items-center justify-between">
            <Select value={filtroCurso} onValueChange={setFiltroCurso}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar cursos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os cursos</SelectItem>
                <SelectItem value="epis">EPIs</SelectItem>
                <SelectItem value="respiratoria">Proteção Respiratória</SelectItem>
                <SelectItem value="cabeca">Proteção Cabeça</SelectItem>
                <SelectItem value="auditiva">Proteção Auditiva</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={() => document.getElementById('novo-curso').showModal()}>
              Adicionar Curso
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cursosFiltrados.map((curso) => (
              <motion.div
                key={curso.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{curso.titulo}</h3>
                    <p className="text-sm text-muted-foreground">{curso.descricao}</p>
                  </div>
                  <Badge className={getCorNivel(curso.nivel)}>
                    {curso.nivel}
                  </Badge>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progresso</span>
                    <span>{curso.progresso}%</span>
                  </div>
                  <Progress value={curso.progresso} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {curso.duracao} min
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {curso.colaboradores}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {curso.avaliacao}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" className="flex-1">
                    <Play className="w-4 h-4 mr-1" />
                    Assistir
                  </Button>
                  {curso.certificado && (
                    <Button variant="outline" size="sm">
                      <Award className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="certificacoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Certificações Digitais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {certificacoes.map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Award className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{cert.colaborador}</h4>
                        <p className="text-sm text-muted-foreground">{cert.curso}</p>
                        <p className="text-xs text-muted-foreground">
                          Emitida: {cert.data} | Válida até: {cert.validade}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getCorStatus(cert.status)}>
                        {cert.status.toUpperCase()}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colaboradores" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Progresso dos Colaboradores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {colaboradores.map((colab) => (
                  <div key={colab.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{colab.nome}</h4>
                        <p className="text-sm text-muted-foreground">{colab.cargo}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{colab.cursos} cursos</span>
                          <span>{colab.certificados} certificados</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">{colab.progresso}%</div>
                        <Progress value={colab.progresso} className="w-24 h-2" />
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Interativo</CardTitle>
            </CardHeader>
            <CardContent>
              {!quizAtivo ? (
                <div className="text-center space-y-4">
                  <div className="p-8 bg-blue-50 rounded-lg">
                    <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Teste seus Conhecimentos</h3>
                    <p className="text-muted-foreground mb-4">
                      Responda o quiz sobre uso correto de EPIs e ganhe certificação
                    </p>
                    <Button onClick={iniciarQuiz} size="lg">
                      Iniciar Quiz
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold">{quizAtivo.titulo}</h3>
                    <p className="text-muted-foreground">
                      Pergunta {Object.keys(respostasQuiz).length + 1} de {quizAtivo.perguntas.length}
                    </p>
                  </div>

                  {quizAtivo.perguntas.map((pergunta, index) => {
                    const respondida = respostasQuiz[pergunta.id] !== undefined;
                    const acertou = respondida && respostasQuiz[pergunta.id] === pergunta.resposta;

                    return (
                      <div key={pergunta.id} className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-3">
                            {index + 1}. {pergunta.pergunta}
                          </h4>
                          <div className="space-y-2">
                            {pergunta.opcoes.map((opcao, opcaoIndex) => (
                              <div key={opcaoIndex} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`pergunta-${pergunta.id}-opcao-${opcaoIndex}`}
                                  checked={respostasQuiz[pergunta.id] === opcaoIndex}
                                  onCheckedChange={() => responderQuiz(pergunta.id, opcaoIndex)}
                                  disabled={respondida}
                                />
                                <Label 
                                  htmlFor={`pergunta-${pergunta.id}-opcao-${opcaoIndex}`}
                                  className={`flex-1 cursor-pointer ${respondida ? 'opacity-50' : ''}`}
                                >
                                  {opcao}
                                </Label>
                                {respondida && (
                                  <div className="flex items-center gap-1">
                                    {acertou ? (
                                      <CheckCircle className="w-4 h-4 text-green-500" />
                                    ) : (
                                      <div className="w-4 h-4 text-red-500">✗</div>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {Object.keys(respostasQuiz).length === quizAtivo.perguntas.length && (
                    <div className="text-center space-y-4">
                      <div className="p-6 bg-green-50 rounded-lg">
                        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Quiz Concluído!</h3>
                        <p className="text-muted-foreground mb-4">
                          Você respondeu todas as perguntas. Clique em finalizar para ver seu resultado.
                        </p>
                        <Button onClick={finalizarQuiz} size="lg">
                          Finalizar Quiz
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relatorios" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Estatísticas Gerais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{cursos.length}</div>
                    <div className="text-sm text-muted-foreground">Cursos Disponíveis</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{certificacoes.length}</div>
                    <div className="text-sm text-muted-foreground">Certificações Emitidas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round(colaboradores.reduce((acc, colab) => acc + colab.progresso, 0) / colaboradores.length)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Progresso Médio</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Cursos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cursos
                    .sort((a, b) => b.colaboradores - a.colaboradores)
                    .slice(0, 3)
                    .map((curso) => (
                      <div key={curso.id} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{curso.titulo}</div>
                          <div className="text-sm text-muted-foreground">{curso.colaboradores} alunos</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">{curso.avaliacao}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certificações por Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Válidas</span>
                    <Badge className="bg-green-100 text-green-800">
                      {certificacoes.filter(c => c.status === 'valido').length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Expiradas</span>
                    <Badge className="bg-red-100 text-red-800">
                      {certificacoes.filter(c => c.status === 'expirado').length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Próximas do Vencimento</span>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      {certificacoes.filter(c => c.status === 'proximo').length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal para adicionar novo curso */}
      <dialog id="novo-curso" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Adicionar Novo Curso</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="titulo-curso">Título</Label>
              <Input
                id="titulo-curso"
                value={novoCurso.titulo}
                onChange={(e) => setNovoCurso(prev => ({ ...prev, titulo: e.target.value }))}
                placeholder="Título do curso"
              />
            </div>
            <div>
              <Label htmlFor="descricao-curso">Descrição</Label>
              <Textarea
                id="descricao-curso"
                value={novoCurso.descricao}
                onChange={(e) => setNovoCurso(prev => ({ ...prev, descricao: e.target.value }))}
                placeholder="Descrição do curso"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="categoria-curso">Categoria</Label>
                <Select 
                  value={novoCurso.categoria} 
                  onValueChange={(value) => setNovoCurso(prev => ({ ...prev, categoria: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="epis">EPIs</SelectItem>
                    <SelectItem value="respiratoria">Proteção Respiratória</SelectItem>
                    <SelectItem value="cabeca">Proteção Cabeça</SelectItem>
                    <SelectItem value="auditiva">Proteção Auditiva</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="nivel-curso">Nível</Label>
                <Select 
                  value={novoCurso.nivel} 
                  onValueChange={(value) => setNovoCurso(prev => ({ ...prev, nivel: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basico">Básico</SelectItem>
                    <SelectItem value="intermediario">Intermediário</SelectItem>
                    <SelectItem value="avancado">Avançado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="duracao-curso">Duração (minutos)</Label>
              <Input
                id="duracao-curso"
                type="number"
                value={novoCurso.duracao}
                onChange={(e) => setNovoCurso(prev => ({ ...prev, duracao: parseInt(e.target.value) }))}
                min="1"
              />
            </div>
            <div>
              <Label htmlFor="video-curso">URL do Vídeo</Label>
              <Input
                id="video-curso"
                value={novoCurso.videoUrl}
                onChange={(e) => setNovoCurso(prev => ({ ...prev, videoUrl: e.target.value }))}
                placeholder="https://example.com/video"
              />
            </div>
          </div>
          <div className="modal-action">
            <Button variant="outline" onClick={() => document.getElementById('novo-curso').close()}>
              Cancelar
            </Button>
            <Button onClick={() => {
              adicionarCurso();
              document.getElementById('novo-curso').close();
            }}>
              Adicionar Curso
            </Button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ModuloTreinamentos; 