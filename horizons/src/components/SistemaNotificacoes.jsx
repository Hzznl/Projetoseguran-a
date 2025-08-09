import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Mail, MessageCircle, AlertTriangle, CheckCircle, X, Settings, Filter } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const SistemaNotificacoes = ({ epis }) => {
  const [notificacoes, setNotificacoes] = useState([]);
  const [configuracoes, setConfiguracoes] = useState({
    email: true,
    push: true,
    whatsapp: false,
    telegram: false,
    vencimento: 30,
    criticos: true,
    manutencao: true,
    incidentes: true
  });
  const [filtro, setFiltro] = useState('todas');
  const [novaNotificacao, setNovaNotificacao] = useState({
    titulo: '',
    mensagem: '',
    tipo: 'info',
    prioridade: 'media',
    destinatarios: 'todos'
  });

  // Simular notificações baseadas nos EPIs
  useEffect(() => {
    const gerarNotificacoes = () => {
      const notifs = [];
      
      // Notificações de EPIs próximos do vencimento
      epis.forEach(epi => {
        const diasParaVencimento = Math.ceil((new Date(epi.dataVencimento) - new Date()) / (1000 * 60 * 60 * 24));
        
        if (diasParaVencimento <= 7 && diasParaVencimento > 0) {
          notifs.push({
            id: `vencimento-${epi.id}`,
            titulo: 'EPI Próximo do Vencimento',
            mensagem: `${epi.nome} vence em ${diasParaVencimento} dias`,
            tipo: 'warning',
            prioridade: 'alta',
            categoria: 'vencimento',
            data: new Date(),
            lida: false,
            epiId: epi.id
          });
        } else if (diasParaVencimento <= 0) {
          notifs.push({
            id: `vencido-${epi.id}`,
            titulo: 'EPI Vencido',
            mensagem: `${epi.nome} está vencido há ${Math.abs(diasParaVencimento)} dias`,
            tipo: 'error',
            prioridade: 'critica',
            categoria: 'vencimento',
            data: new Date(),
            lida: false,
            epiId: epi.id
          });
        }
      });

      // Notificações de manutenção
      if (Math.random() > 0.7) {
        notifs.push({
          id: 'manutencao-1',
          titulo: 'Manutenção Preventiva',
          mensagem: 'EPIs de proteção respiratória precisam de inspeção',
          tipo: 'info',
          prioridade: 'media',
          categoria: 'manutencao',
          data: new Date(),
          lida: false
        });
      }

      // Notificações de incidentes
      if (Math.random() > 0.8) {
        notifs.push({
          id: 'incidente-1',
          titulo: 'Incidente Reportado',
          mensagem: 'Colaborador relatou problema com capacete de segurança',
          tipo: 'error',
          prioridade: 'alta',
          categoria: 'incidente',
          data: new Date(),
          lida: false
        });
      }

      setNotificacoes(notifs);
    };

    gerarNotificacoes();
    const interval = setInterval(gerarNotificacoes, 30000); // Atualiza a cada 30 segundos

    return () => clearInterval(interval);
  }, [epis]);

  const marcarComoLida = (id) => {
    setNotificacoes(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, lida: true } : notif
      )
    );
  };

  const enviarNotificacao = () => {
    if (novaNotificacao.titulo && novaNotificacao.mensagem) {
      const notif = {
        id: `manual-${Date.now()}`,
        ...novaNotificacao,
        categoria: 'manual',
        data: new Date(),
        lida: false
      };
      
      setNotificacoes(prev => [notif, ...prev]);
      setNovaNotificacao({
        titulo: '',
        mensagem: '',
        tipo: 'info',
        prioridade: 'media',
        destinatarios: 'todos'
      });
    }
  };

  const notificacoesFiltradas = notificacoes.filter(notif => {
    if (filtro === 'todas') return true;
    if (filtro === 'nao-lidas') return !notif.lida;
    return notif.categoria === filtro;
  });

  const notificacoesNaoLidas = notificacoes.filter(n => !n.lida).length;

  const getIconeTipo = (tipo) => {
    switch (tipo) {
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Bell className="w-4 h-4 text-blue-500" />;
    }
  };

  const getCorPrioridade = (prioridade) => {
    switch (prioridade) {
      case 'critica': return 'bg-red-100 text-red-800 border-red-200';
      case 'alta': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Sistema de Notificações</h2>
          <p className="text-muted-foreground">Gerencie alertas e comunicações em tempo real</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Bell className="w-4 h-4" />
            {notificacoesNaoLidas} não lidas
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="notificacoes" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          <TabsTrigger value="enviar">Enviar</TabsTrigger>
          <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="notificacoes" className="space-y-4">
          <div className="flex items-center gap-4">
            <Select value={filtro} onValueChange={setFiltro}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar notificações" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="nao-lidas">Não lidas</SelectItem>
                <SelectItem value="vencimento">Vencimento</SelectItem>
                <SelectItem value="manutencao">Manutenção</SelectItem>
                <SelectItem value="incidente">Incidentes</SelectItem>
                <SelectItem value="manual">Manuais</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setNotificacoes(prev => prev.map(n => ({ ...n, lida: true })))}
            >
              Marcar todas como lidas
            </Button>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {notificacoesFiltradas.map((notif) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`p-4 border rounded-lg ${notif.lida ? 'bg-muted/50' : 'bg-background'}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getIconeTipo(notif.tipo)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{notif.titulo}</h4>
                          <Badge className={getCorPrioridade(notif.prioridade)}>
                            {notif.prioridade.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{notif.mensagem}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notif.data.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!notif.lida && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => marcarComoLida(notif.id)}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </TabsContent>

        <TabsContent value="enviar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Enviar Nova Notificação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="titulo">Título</Label>
                  <Input
                    id="titulo"
                    value={novaNotificacao.titulo}
                    onChange={(e) => setNovaNotificacao(prev => ({ ...prev, titulo: e.target.value }))}
                    placeholder="Título da notificação"
                  />
                </div>
                <div>
                  <Label htmlFor="tipo">Tipo</Label>
                  <Select 
                    value={novaNotificacao.tipo} 
                    onValueChange={(value) => setNovaNotificacao(prev => ({ ...prev, tipo: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Informação</SelectItem>
                      <SelectItem value="warning">Aviso</SelectItem>
                      <SelectItem value="error">Erro</SelectItem>
                      <SelectItem value="success">Sucesso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="prioridade">Prioridade</Label>
                  <Select 
                    value={novaNotificacao.prioridade} 
                    onValueChange={(value) => setNovaNotificacao(prev => ({ ...prev, prioridade: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baixa">Baixa</SelectItem>
                      <SelectItem value="media">Média</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="critica">Crítica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="destinatarios">Destinatários</Label>
                  <Select 
                    value={novaNotificacao.destinatarios} 
                    onValueChange={(value) => setNovaNotificacao(prev => ({ ...prev, destinatarios: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="gestores">Gestores</SelectItem>
                      <SelectItem value="colaboradores">Colaboradores</SelectItem>
                      <SelectItem value="manutencao">Equipe de Manutenção</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="mensagem">Mensagem</Label>
                <Textarea
                  id="mensagem"
                  value={novaNotificacao.mensagem}
                  onChange={(e) => setNovaNotificacao(prev => ({ ...prev, mensagem: e.target.value }))}
                  placeholder="Digite a mensagem da notificação..."
                  rows={4}
                />
              </div>

              <Button onClick={enviarNotificacao} className="w-full">
                Enviar Notificação
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuracoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Canais de Notificação</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <Label>Notificações por E-mail</Label>
                    </div>
                    <Switch 
                      checked={configuracoes.email} 
                      onCheckedChange={(checked) => setConfiguracoes(prev => ({ ...prev, email: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      <Label>Notificações Push</Label>
                    </div>
                    <Switch 
                      checked={configuracoes.push} 
                      onCheckedChange={(checked) => setConfiguracoes(prev => ({ ...prev, push: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      <Label>WhatsApp</Label>
                    </div>
                    <Switch 
                      checked={configuracoes.whatsapp} 
                      onCheckedChange={(checked) => setConfiguracoes(prev => ({ ...prev, whatsapp: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      <Label>Telegram</Label>
                    </div>
                    <Switch 
                      checked={configuracoes.telegram} 
                      onCheckedChange={(checked) => setConfiguracoes(prev => ({ ...prev, telegram: checked }))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Tipos de Alerta</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>EPIs Críticos</Label>
                    <Switch 
                      checked={configuracoes.criticos} 
                      onCheckedChange={(checked) => setConfiguracoes(prev => ({ ...prev, criticos: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Manutenção Preventiva</Label>
                    <Switch 
                      checked={configuracoes.manutencao} 
                      onCheckedChange={(checked) => setConfiguracoes(prev => ({ ...prev, manutencao: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Incidentes</Label>
                    <Switch 
                      checked={configuracoes.incidentes} 
                      onCheckedChange={(checked) => setConfiguracoes(prev => ({ ...prev, incidentes: checked }))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Configurações Avançadas</h4>
                <div>
                  <Label htmlFor="vencimento">Dias para alerta de vencimento</Label>
                  <Input
                    id="vencimento"
                    type="number"
                    value={configuracoes.vencimento}
                    onChange={(e) => setConfiguracoes(prev => ({ ...prev, vencimento: parseInt(e.target.value) }))}
                    min="1"
                    max="90"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historico" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Notificações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{notificacoes.length}</div>
                    <div className="text-sm text-muted-foreground">Total</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {notificacoes.filter(n => n.prioridade === 'critica').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Críticas</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      {notificacoes.filter(n => n.prioridade === 'alta').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Altas</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {notificacoes.filter(n => n.lida).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Lidas</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SistemaNotificacoes; 