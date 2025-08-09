import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Star, AlertTriangle, DollarSign, FileText, Plus, Eye, Edit, Trash2, TrendingUp, Package, Shield } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const GestaoFornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [compras, setCompras] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [recalls, setRecalls] = useState([]);
  const [filtroFornecedor, setFiltroFornecedor] = useState('todos');
  const [novoFornecedor, setNovoFornecedor] = useState({
    nome: '',
    cnpj: '',
    categoria: 'epis',
    contato: '',
    email: '',
    telefone: '',
    endereco: '',
    avaliacao: 0,
    status: 'ativo'
  });

  // Dados simulados de fornecedores
  useEffect(() => {
    const fornecedoresData = [
      {
        id: 1,
        nome: 'Segurança Total Ltda',
        cnpj: '12.345.678/0001-90',
        categoria: 'epis',
        contato: 'João Silva',
        email: 'joao@segurancatotal.com',
        telefone: '(11) 99999-9999',
        endereco: 'Rua das Seguranças, 123 - São Paulo/SP',
        avaliacao: 4.8,
        status: 'ativo',
        produtos: ['Capacetes', 'Luvas', 'Óculos'],
        tempoEntrega: '3-5 dias',
        certificacoes: ['ISO 9001', 'ISO 14001'],
        ultimaCompra: '2024-03-01',
        valorTotal: 45000
      },
      {
        id: 2,
        nome: 'Proteção Industrial S.A.',
        cnpj: '98.765.432/0001-10',
        categoria: 'respiratoria',
        contato: 'Maria Santos',
        email: 'maria@protecaoindustrial.com',
        telefone: '(11) 88888-8888',
        endereco: 'Av. da Proteção, 456 - São Paulo/SP',
        avaliacao: 4.5,
        status: 'ativo',
        produtos: ['Respiradores', 'Filtros', 'Máscaras'],
        tempoEntrega: '2-4 dias',
        certificacoes: ['ISO 9001'],
        ultimaCompra: '2024-02-15',
        valorTotal: 32000
      },
      {
        id: 3,
        nome: 'Equipamentos Seguros',
        cnpj: '55.444.333/0001-20',
        categoria: 'calçados',
        contato: 'Pedro Costa',
        email: 'pedro@equipamentosseguros.com',
        telefone: '(11) 77777-7777',
        endereco: 'Rua dos Equipamentos, 789 - São Paulo/SP',
        avaliacao: 4.2,
        status: 'inativo',
        produtos: ['Calçados de Segurança', 'Botas'],
        tempoEntrega: '5-7 dias',
        certificacoes: ['ISO 9001'],
        ultimaCompra: '2024-01-20',
        valorTotal: 18000
      }
    ];

    const comprasData = [
      {
        id: 1,
        fornecedorId: 1,
        fornecedorNome: 'Segurança Total Ltda',
        produto: 'Capacetes de Segurança',
        quantidade: 50,
        valorUnitario: 45.00,
        valorTotal: 2250.00,
        data: '2024-03-01',
        status: 'entregue',
        avaliacao: 5
      },
      {
        id: 2,
        fornecedorId: 2,
        fornecedorNome: 'Proteção Industrial S.A.',
        produto: 'Respiradores PFF2',
        quantidade: 100,
        valorUnitario: 12.50,
        valorTotal: 1250.00,
        data: '2024-02-15',
        status: 'entregue',
        avaliacao: 4
      },
      {
        id: 3,
        fornecedorId: 1,
        fornecedorNome: 'Segurança Total Ltda',
        produto: 'Luvas de Proteção',
        quantidade: 200,
        valorUnitario: 8.75,
        valorTotal: 1750.00,
        data: '2024-02-10',
        status: 'entregue',
        avaliacao: 5
      }
    ];

    const avaliacoesData = [
      {
        id: 1,
        fornecedorId: 1,
        fornecedorNome: 'Segurança Total Ltda',
        criterio: 'Qualidade do Produto',
        nota: 5,
        comentario: 'Produtos de excelente qualidade, conforme especificações',
        data: '2024-03-05'
      },
      {
        id: 2,
        fornecedorId: 1,
        fornecedorNome: 'Segurança Total Ltda',
        criterio: 'Prazo de Entrega',
        nota: 4,
        comentario: 'Entrega dentro do prazo, mas poderia ser mais rápida',
        data: '2024-03-05'
      },
      {
        id: 3,
        fornecedorId: 2,
        fornecedorNome: 'Proteção Industrial S.A.',
        criterio: 'Atendimento',
        nota: 5,
        comentario: 'Atendimento muito bom, equipe prestativa',
        data: '2024-02-20'
      }
    ];

    const recallsData = [
      {
        id: 1,
        fornecedorId: 3,
        fornecedorNome: 'Equipamentos Seguros',
        produto: 'Calçados de Segurança - Lote 2024-001',
        motivo: 'Defeito na sola',
        dataRecall: '2024-03-10',
        status: 'ativo',
        acao: 'Suspender uso e contatar fornecedor'
      }
    ];

    setFornecedores(fornecedoresData);
    setCompras(comprasData);
    setAvaliacoes(avaliacoesData);
    setRecalls(recallsData);
  }, []);

  const adicionarFornecedor = () => {
    if (novoFornecedor.nome && novoFornecedor.cnpj) {
      const fornecedor = {
        id: Date.now(),
        ...novoFornecedor,
        produtos: [],
        tempoEntrega: '5-7 dias',
        certificacoes: [],
        ultimaCompra: null,
        valorTotal: 0
      };
      
      setFornecedores(prev => [fornecedor, ...prev]);
      setNovoFornecedor({
        nome: '',
        cnpj: '',
        categoria: 'epis',
        contato: '',
        email: '',
        telefone: '',
        endereco: '',
        avaliacao: 0,
        status: 'ativo'
      });
    }
  };

  const fornecedoresFiltrados = fornecedores.filter(fornecedor => {
    if (filtroFornecedor === 'todos') return true;
    return fornecedor.categoria === filtroFornecedor;
  });

  const getCorStatus = (status) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800';
      case 'inativo': return 'bg-red-100 text-red-800';
      case 'suspenso': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCorAvaliacao = (avaliacao) => {
    if (avaliacao >= 4.5) return 'bg-green-100 text-green-800';
    if (avaliacao >= 4.0) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const calcularTotalCompras = (fornecedorId) => {
    return compras
      .filter(compra => compra.fornecedorId === fornecedorId)
      .reduce((acc, compra) => acc + compra.valorTotal, 0);
  };

  const calcularMediaAvaliacao = (fornecedorId) => {
    const avaliacoesFornecedor = avaliacoes.filter(av => av.fornecedorId === fornecedorId);
    if (avaliacoesFornecedor.length === 0) return 0;
    return avaliacoesFornecedor.reduce((acc, av) => acc + av.nota, 0) / avaliacoesFornecedor.length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Fornecedores</h2>
          <p className="text-muted-foreground">Cadastro, avaliação e controle de fornecedores de EPIs</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Building2 className="w-4 h-4" />
            {fornecedores.length} fornecedores
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="fornecedores" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="fornecedores">Fornecedores</TabsTrigger>
          <TabsTrigger value="compras">Compras</TabsTrigger>
          <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
          <TabsTrigger value="recalls">Recalls</TabsTrigger>
          <TabsTrigger value="analise">Análise</TabsTrigger>
        </TabsList>

        <TabsContent value="fornecedores" className="space-y-4">
          <div className="flex items-center justify-between">
            <Select value={filtroFornecedor} onValueChange={setFiltroFornecedor}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar fornecedores" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="epis">EPIs</SelectItem>
                <SelectItem value="respiratoria">Proteção Respiratória</SelectItem>
                <SelectItem value="calçados">Calçados</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={() => document.getElementById('novo-fornecedor').showModal()}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Fornecedor
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fornecedoresFiltrados.map((fornecedor) => (
              <motion.div
                key={fornecedor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{fornecedor.nome}</h3>
                      <Badge className={getCorStatus(fornecedor.status)}>
                        {fornecedor.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{fornecedor.cnpj}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">{fornecedor.avaliacao}</span>
                      <Badge className={getCorAvaliacao(fornecedor.avaliacao)}>
                        {fornecedor.avaliacao >= 4.5 ? 'Excelente' : 
                         fornecedor.avaliacao >= 4.0 ? 'Bom' : 'Regular'}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Contato:</span>
                    <span className="font-medium">{fornecedor.contato}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Categoria:</span>
                    <span className="font-medium">{fornecedor.categoria}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Compras:</span>
                    <span className="font-medium">R$ {calcularTotalCompras(fornecedor.id).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Última Compra:</span>
                    <span className="font-medium">
                      {fornecedor.ultimaCompra ? fornecedor.ultimaCompra : 'N/A'}
                    </span>
                  </div>
                </div>

                {fornecedor.produtos.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium mb-1">Produtos:</h4>
                    <div className="flex flex-wrap gap-1">
                      {fornecedor.produtos.map((produto, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {produto}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compras" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Histórico de Compras
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {compras.map((compra) => (
                  <div key={compra.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Package className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{compra.produto}</h4>
                        <p className="text-sm text-muted-foreground">{compra.fornecedorNome}</p>
                        <p className="text-xs text-muted-foreground">
                          Quantidade: {compra.quantidade} | Data: {compra.data}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-semibold">R$ {compra.valorTotal.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">
                          R$ {compra.valorUnitario.toFixed(2)}/un
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getCorStatus(compra.status)}>
                          {compra.status.toUpperCase()}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">{compra.avaliacao}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="avaliacoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Avaliações de Qualidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {avaliacoes.map((avaliacao) => (
                  <div key={avaliacao.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{avaliacao.fornecedorNome}</h4>
                          <Badge className={getCorAvaliacao(avaliacao.nota)}>
                            {avaliacao.nota}/5
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Critério: {avaliacao.criterio}
                        </p>
                        <p className="text-sm">{avaliacao.comentario}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{avaliacao.data}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recalls" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Alertas de Recall
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recalls.map((recall) => (
                  <div key={recall.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-red-800">{recall.produto}</h4>
                          <Badge className="bg-red-100 text-red-800">
                            {recall.status.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-red-700 mb-2">
                          Fornecedor: {recall.fornecedorNome}
                        </p>
                        <p className="text-sm text-red-700 mb-2">
                          Motivo: {recall.motivo}
                        </p>
                        <p className="text-sm text-red-700">
                          Ação: {recall.acao}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-red-600">{recall.dataRecall}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analise" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Análise de Fornecedores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {fornecedores.filter(f => f.status === 'ativo').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Fornecedores Ativos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {fornecedores.filter(f => f.avaliacao >= 4.5).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Excelente Avaliação</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {recalls.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Recalls Ativos</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Fornecedores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {fornecedores
                    .sort((a, b) => b.avaliacao - a.avaliacao)
                    .slice(0, 3)
                    .map((fornecedor) => (
                      <div key={fornecedor.id} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{fornecedor.nome}</div>
                          <div className="text-sm text-muted-foreground">{fornecedor.categoria}</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium">{fornecedor.avaliacao}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compras por Categoria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>EPIs</span>
                    <span className="font-semibold">
                      R$ {compras.filter(c => c.produto.includes('Capacete') || c.produto.includes('Luvas')).reduce((acc, c) => acc + c.valorTotal, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Respiratória</span>
                    <span className="font-semibold">
                      R$ {compras.filter(c => c.produto.includes('Respirador') || c.produto.includes('Máscara')).reduce((acc, c) => acc + c.valorTotal, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Calçados</span>
                    <span className="font-semibold">
                      R$ {compras.filter(c => c.produto.includes('Calçado') || c.produto.includes('Bota')).reduce((acc, c) => acc + c.valorTotal, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal para novo fornecedor */}
      <dialog id="novo-fornecedor" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Novo Fornecedor</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome-fornecedor">Nome</Label>
                <Input
                  id="nome-fornecedor"
                  value={novoFornecedor.nome}
                  onChange={(e) => setNovoFornecedor(prev => ({ ...prev, nome: e.target.value }))}
                  placeholder="Nome da empresa"
                />
              </div>
              <div>
                <Label htmlFor="cnpj-fornecedor">CNPJ</Label>
                <Input
                  id="cnpj-fornecedor"
                  value={novoFornecedor.cnpj}
                  onChange={(e) => setNovoFornecedor(prev => ({ ...prev, cnpj: e.target.value }))}
                  placeholder="00.000.000/0000-00"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="categoria-fornecedor">Categoria</Label>
                <Select 
                  value={novoFornecedor.categoria} 
                  onValueChange={(value) => setNovoFornecedor(prev => ({ ...prev, categoria: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="epis">EPIs</SelectItem>
                    <SelectItem value="respiratoria">Proteção Respiratória</SelectItem>
                    <SelectItem value="calçados">Calçados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status-fornecedor">Status</Label>
                <Select 
                  value={novoFornecedor.status} 
                  onValueChange={(value) => setNovoFornecedor(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                    <SelectItem value="suspenso">Suspenso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="contato-fornecedor">Contato</Label>
              <Input
                id="contato-fornecedor"
                value={novoFornecedor.contato}
                onChange={(e) => setNovoFornecedor(prev => ({ ...prev, contato: e.target.value }))}
                placeholder="Nome do contato"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email-fornecedor">E-mail</Label>
                <Input
                  id="email-fornecedor"
                  type="email"
                  value={novoFornecedor.email}
                  onChange={(e) => setNovoFornecedor(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@empresa.com"
                />
              </div>
              <div>
                <Label htmlFor="telefone-fornecedor">Telefone</Label>
                <Input
                  id="telefone-fornecedor"
                  value={novoFornecedor.telefone}
                  onChange={(e) => setNovoFornecedor(prev => ({ ...prev, telefone: e.target.value }))}
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="endereco-fornecedor">Endereço</Label>
              <Textarea
                id="endereco-fornecedor"
                value={novoFornecedor.endereco}
                onChange={(e) => setNovoFornecedor(prev => ({ ...prev, endereco: e.target.value }))}
                placeholder="Endereço completo"
                rows={2}
              />
            </div>
          </div>
          <div className="modal-action">
            <Button variant="outline" onClick={() => document.getElementById('novo-fornecedor').close()}>
              Cancelar
            </Button>
            <Button onClick={() => {
              adicionarFornecedor();
              document.getElementById('novo-fornecedor').close();
            }}>
              Adicionar Fornecedor
            </Button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default GestaoFornecedores; 