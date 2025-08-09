import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Users, Lightbulb, Send, ThumbsUp, ThumbsDown, Eye, Plus, Filter, Bell, Shield, AlertTriangle } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const SistemaComunicacao = () => {
  const [mensagens, setMensagens] = useState([]);
  const [forum, setForum] = useState([]);
  const [sugestoes, setSugestoes] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [comunicacoes, setComunicacoes] = useState([]);
  const [usuarioAtual, setUsuarioAtual] = useState({
    id: 1,
    nome: 'João Silva',
    cargo: 'Técnico de Segurança',
    avatar: null
  });
  const [novaMensagem, setNovaMensagem] = useState('');
  const [novaSugestao, setNovaSugestao] = useState({
    titulo: '',
    descricao: '',
    categoria: 'geral',
    anonimo: false
  });
  const [novoFeedback, setNovoFeedback] = useState({
    tipo: 'sugestao',
    mensagem: '',
    anonimo: true
  });

  // Dados simulados de comunicação
  useEffect(() => {
    const mensagensData = [
      {
        id: 1,
        usuario: {
          id: 1,
          nome: 'João Silva',
          cargo: 'Técnico de Segurança',
          avatar: null
        },
        mensagem: 'Alguém sabe onde posso encontrar o manual de uso dos respiradores?',
        data: '2024-03-15T10:30:00',
        canal: 'geral',
        likes: 3,
        respostas: [
          {
            id: 1,
            usuario: {
              id: 2,
              nome: 'Maria Santos',
              cargo: 'Supervisora',
              avatar: null
            },
            mensagem: 'Está na pasta compartilhada "Documentos EPIs"',
            data: '2024-03-15T10:35:00'
          }
        ]
      },
      {
        id: 2,
        usuario: {
          id: 3,
          nome: 'Pedro Costa',
          cargo: 'Operador',
          avatar: null
        },
        mensagem: 'Preciso trocar meu capacete, está com a tira desgastada. Como faço?',
        data: '2024-03-15T09:15:00',
        canal: 'epis',
        likes: 5,
        respostas: []
      }
    ];

    const forumData = [
      {
        id: 1,
        titulo: 'Melhorias no Sistema de EPIs',
        autor: {
          id: 2,
          nome: 'Maria Santos',
          cargo: 'Supervisora',
          avatar: null
        },
        categoria: 'sugestao',
        conteudo: 'Sugiro implementarmos um sistema de alertas automáticos para EPIs próximos do vencimento. Isso ajudaria muito na gestão.',
        data: '2024-03-14T14:20:00',
        likes: 12,
        comentarios: 8,
        status: 'em_analise'
      },
      {
        id: 2,
        titulo: 'Treinamento sobre Proteção Respiratória',
        autor: {
          id: 4,
          nome: 'Ana Oliveira',
          cargo: 'Técnica de RH',
          avatar: null
        },
        categoria: 'treinamento',
        conteudo: 'Vamos organizar um treinamento específico sobre uso correto de respiradores. Quem tem interesse?',
        data: '2024-03-13T16:45:00',
        likes: 15,
        comentarios: 12,
        status: 'ativo'
      }
    ];

    const sugestoesData = [
      {
        id: 1,
        titulo: 'Sistema de Notificações',
        descricao: 'Implementar notificações automáticas para EPIs próximos do vencimento',
        categoria: 'sistema',
        autor: 'João Silva',
        data: '2024-03-10',
        status: 'aprovada',
        votos: 25,
        anonimo: false
      },
      {
        id: 2,
        titulo: 'Mais EPIs de Proteção Auditiva',
        descricao: 'Precisamos de mais protetores auriculares na linha de produção',
        categoria: 'equipamento',
        autor: 'Anônimo',
        data: '2024-03-08',
        status: 'em_analise',
        votos: 18,
        anonimo: true
      }
    ];

    const feedbackData = [
      {
        id: 1,
        tipo: 'sugestao',
        mensagem: 'O sistema de EPIs está muito bom, mas poderia ter mais filtros de busca',
        data: '2024-03-12',
        anonimo: true,
        status: 'recebido'
      },
      {
        id: 2,
        tipo: 'problema',
        mensagem: 'Alguns EPIs estão chegando com defeito do fornecedor',
        data: '2024-03-11',
        anonimo: false,
        autor: 'Pedro Costa',
        status: 'em_acao'
      }
    ];

    const comunicacoesData = [
      {
        id: 1,
        titulo: 'Nova Política de EPIs',
        mensagem: 'A partir de hoje, todos os colaboradores devem usar EPIs adequados às suas atividades. Verifiquem se seus equipamentos estão em dia.',
        autor: 'Gestão de Segurança',
        data: '2024-03-15T08:00:00',
        destinatarios: 'todos',
        prioridade: 'alta',
        lida: false
      },
      {
        id: 2,
        titulo: 'Manutenção Preventiva',
        mensagem: 'Será realizada manutenção preventiva nos EPIs na próxima semana. Fiquem atentos aos comunicados.',
        autor: 'Equipe de Manutenção',
        data: '2024-03-14T14:30:00',
        destinatarios: 'producao',
        prioridade: 'media',
        lida: true
      }
    ];

    setMensagens(mensagensData);
    setForum(forumData);
    setSugestoes(sugestoesData);
    setFeedback(feedbackData);
    setComunicacoes(comunicacoesData);
  }, []);

  const enviarMensagem = () => {
    if (novaMensagem.trim()) {
      const mensagem = {
        id: Date.now(),
        usuario: usuarioAtual,
        mensagem: novaMensagem,
        data: new Date().toISOString(),
        canal: 'geral',
        likes: 0,
        respostas: []
      };
      
      setMensagens(prev => [mensagem, ...prev]);
      setNovaMensagem('');
    }
  };

  const adicionarSugestao = () => {
    if (novaSugestao.titulo && novaSugestao.descricao) {
      const sugestao = {
        id: Date.now(),
        ...novaSugestao,
        autor: novaSugestao.anonimo ? 'Anônimo' : usuarioAtual.nome,
        data: new Date().toISOString().split('T')[0],
        status: 'pendente',
        votos: 0
      };
      
      setSugestoes(prev => [sugestao, ...prev]);
      setNovaSugestao({
        titulo: '',
        descricao: '',
        categoria: 'geral',
        anonimo: false
      });
    }
  };

  const enviarFeedback = () => {
    if (novoFeedback.mensagem.trim()) {
      const feedbackItem = {
        id: Date.now(),
        ...novoFeedback,
        data: new Date().toISOString().split('T')[0],
        autor: novoFeedback.anonimo ? null : usuarioAtual.nome,
        status: 'recebido'
      };
      
      setFeedback(prev => [feedbackItem, ...prev]);
      setNovoFeedback({
        tipo: 'sugestao',
        mensagem: '',
        anonimo: true
      });
    }
  };

  const getCorPrioridade = (prioridade) => {
    switch (prioridade) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getCorStatus = (status) => {
    switch (status) {
      case 'aprovada': return 'bg-green-100 text-green-800';
      case 'em_analise': return 'bg-yellow-100 text-yellow-800';
      case 'pendente': return 'bg-blue-100 text-blue-800';
      case 'rejeitada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Sistema de Comunicação Interna</h2>
          <p className="text-muted-foreground">Chat, fórum, sugestões e feedback colaborativo</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {mensagens.length} mensagens
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="forum">Fórum</TabsTrigger>
          <TabsTrigger value="sugestoes">Sugestões</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="comunicacoes">Comunicações</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Chat Interno
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input
                    value={novaMensagem}
                    onChange={(e) => setNovaMensagem(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
                  />
                  <Button onClick={enviarMensagem}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {mensagens.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={msg.usuario.avatar} />
                          <AvatarFallback>
                            {msg.usuario.nome.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{msg.usuario.nome}</span>
                            <Badge variant="outline" className="text-xs">
                              {msg.usuario.cargo}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatarData(msg.data)}
                            </span>
                          </div>
                          <p className="text-sm mb-2">{msg.mensagem}</p>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              {msg.likes}
                            </Button>
                            <Button variant="ghost" size="sm">
                              Responder
                            </Button>
                          </div>
                        </div>
                      </div>

                      {msg.respostas.length > 0 && (
                        <div className="ml-11 mt-3 space-y-2">
                          {msg.respostas.map((resposta) => (
                            <div key={resposta.id} className="border-l-2 border-muted pl-3">
                              <div className="flex items-start gap-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarImage src={resposta.usuario.avatar} />
                                  <AvatarFallback className="text-xs">
                                    {resposta.usuario.nome.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-sm">{resposta.usuario.nome}</span>
                                    <span className="text-xs text-muted-foreground">
                                      {formatarData(resposta.data)}
                                    </span>
                                  </div>
                                  <p className="text-sm">{resposta.mensagem}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forum" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Fórum de Discussão</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nova Discussão
            </Button>
          </div>

          <div className="space-y-4">
            {forum.map((topico) => (
              <motion.div
                key={topico.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{topico.titulo}</h4>
                      <Badge className={getCorStatus(topico.status)}>
                        {topico.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <Badge variant="outline">{topico.categoria}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{topico.conteudo}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Por: {topico.autor.nome}</span>
                      <span>{formatarData(topico.data)}</span>
                      <span>{topico.likes} curtidas</span>
                      <span>{topico.comentarios} comentários</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sugestoes" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Sugestões de Melhorias</h3>
            <Button onClick={() => document.getElementById('nova-sugestao').showModal()}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Sugestão
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sugestoes.map((sugestao) => (
              <motion.div
                key={sugestao.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{sugestao.titulo}</h4>
                      <Badge className={getCorStatus(sugestao.status)}>
                        {sugestao.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{sugestao.descricao}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Por: {sugestao.autor}</span>
                      <span>{sugestao.data}</span>
                      <span>{sugestao.votos} votos</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Sistema de Feedback Anônimo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Enviar Feedback</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="tipo-feedback">Tipo</Label>
                      <Select 
                        value={novoFeedback.tipo} 
                        onValueChange={(value) => setNovoFeedback(prev => ({ ...prev, tipo: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sugestao">Sugestão</SelectItem>
                          <SelectItem value="problema">Problema</SelectItem>
                          <SelectItem value="elogio">Elogio</SelectItem>
                          <SelectItem value="duvida">Dúvida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="mensagem-feedback">Mensagem</Label>
                      <Textarea
                        id="mensagem-feedback"
                        value={novoFeedback.mensagem}
                        onChange={(e) => setNovoFeedback(prev => ({ ...prev, mensagem: e.target.value }))}
                        placeholder="Digite seu feedback..."
                        rows={3}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="anonimo-feedback"
                        checked={novoFeedback.anonimo}
                        onChange={(e) => setNovoFeedback(prev => ({ ...prev, anonimo: e.target.checked }))}
                      />
                      <Label htmlFor="anonimo-feedback">Enviar anonimamente</Label>
                    </div>
                    <Button onClick={enviarFeedback} className="w-full">
                      Enviar Feedback
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Feedback Recebido</h4>
                  {feedback.map((item) => (
                    <div key={item.id} className="border rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{item.tipo}</Badge>
                          <Badge className={getCorStatus(item.status)}>
                            {item.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">{item.data}</span>
                      </div>
                      <p className="text-sm mb-2">{item.mensagem}</p>
                      {item.autor && (
                        <p className="text-xs text-muted-foreground">Por: {item.autor}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comunicacoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Comunicação em Massa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {comunicacoes.map((comunicacao) => (
                  <div key={comunicacao.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{comunicacao.titulo}</h4>
                          <Badge className={getCorPrioridade(comunicacao.prioridade)}>
                            {comunicacao.prioridade.toUpperCase()}
                          </Badge>
                          {!comunicacao.lida && (
                            <Badge className="bg-blue-100 text-blue-800">NOVA</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{comunicacao.mensagem}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Por: {comunicacao.autor}</span>
                          <span>{formatarData(comunicacao.data)}</span>
                          <span>Para: {comunicacao.destinatarios}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal para nova sugestão */}
      <dialog id="nova-sugestao" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Nova Sugestão</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="titulo-sugestao">Título</Label>
              <Input
                id="titulo-sugestao"
                value={novaSugestao.titulo}
                onChange={(e) => setNovaSugestao(prev => ({ ...prev, titulo: e.target.value }))}
                placeholder="Título da sugestão"
              />
            </div>
            <div>
              <Label htmlFor="categoria-sugestao">Categoria</Label>
              <Select 
                value={novaSugestao.categoria} 
                onValueChange={(value) => setNovaSugestao(prev => ({ ...prev, categoria: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="geral">Geral</SelectItem>
                  <SelectItem value="sistema">Sistema</SelectItem>
                  <SelectItem value="equipamento">Equipamento</SelectItem>
                  <SelectItem value="treinamento">Treinamento</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="descricao-sugestao">Descrição</Label>
              <Textarea
                id="descricao-sugestao"
                value={novaSugestao.descricao}
                onChange={(e) => setNovaSugestao(prev => ({ ...prev, descricao: e.target.value }))}
                placeholder="Descreva sua sugestão..."
                rows={4}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="anonimo-sugestao"
                checked={novaSugestao.anonimo}
                onChange={(e) => setNovaSugestao(prev => ({ ...prev, anonimo: e.target.checked }))}
              />
              <Label htmlFor="anonimo-sugestao">Enviar anonimamente</Label>
            </div>
          </div>
          <div className="modal-action">
            <Button variant="outline" onClick={() => document.getElementById('nova-sugestao').close()}>
              Cancelar
            </Button>
            <Button onClick={() => {
              adicionarSugestao();
              document.getElementById('nova-sugestao').close();
            }}>
              Enviar Sugestão
            </Button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SistemaComunicacao; 