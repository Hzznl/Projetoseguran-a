import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, BarChart3, TrendingUp, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const RelatoriosAvancados = ({ epis }) => {
  const [tipoRelatorio, setTipoRelatorio] = useState('pdf');
  const [periodo, setPeriodo] = useState('mes');

  const gerarRelatorioPDF = () => {
    const doc = new jsPDF();
    
    // Configurações de cores
    const corPrimaria = [59, 130, 246]; // Azul
    const corSecundaria = [107, 114, 128]; // Cinza
    const corSucesso = [34, 197, 94]; // Verde
    const corAtencao = [245, 158, 11]; // Amarelo
    const corPerigo = [239, 68, 68]; // Vermelho
    
    // Título principal
    doc.setFontSize(24);
    doc.setTextColor(...corPrimaria);
    doc.text('RELATÓRIO DE EPIs', 105, 25, { align: 'center' });
    
    // Subtítulo
    doc.setFontSize(14);
    doc.setTextColor(...corSecundaria);
    doc.text('Sistema de Gestão de Segurança do Trabalho', 105, 35, { align: 'center' });
    
    // Informações do relatório
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Gerado em: ${format(new Date(), 'dd/MM/yyyy às HH:mm', { locale: ptBR })}`, 20, 50);
    
    // Estatísticas gerais
    doc.setFontSize(14);
    doc.setTextColor(...corPrimaria);
    doc.text('ESTATÍSTICAS GERAIS', 20, 65);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const total = epis.length;
    const validos = epis.filter(e => e.status === 'válido').length;
    const vencidos = epis.filter(e => e.status === 'vencido').length;
    const proximos = epis.filter(e => e.status === 'próximo do vencimento').length;
    
    doc.text(`Total de EPIs: ${total}`, 20, 75);
    doc.text(`EPIs Válidos: ${validos}`, 20, 82);
    doc.text(`EPIs Vencidos: ${vencidos}`, 20, 89);
    doc.text(`Próximos do Vencimento: ${proximos}`, 20, 96);
    
    // Tabela de dados
    doc.setFontSize(14);
    doc.setTextColor(...corPrimaria);
    doc.text('DADOS DETALHADOS DOS EPIs', 20, 115);
    
    // Preparar dados da tabela
    const dadosEPIs = epis.map(epi => [
      epi.nome,
      epi.tipo,
      epi.ca,
      epi.fabricante,
      format(new Date(epi.validade), 'dd/MM/yyyy', { locale: ptBR }),
      epi.status,
      epi.diasParaVencer > 0 ? `${epi.diasParaVencer} dias` : `${Math.abs(epi.diasParaVencer)} dias vencido`
    ]);

    // Criar tabela com formatação melhorada
    autoTable(doc, {
      head: [['Nome', 'Tipo', 'CA', 'Fabricante', 'Validade', 'Status', 'Dias para Vencimento']],
      body: dadosEPIs,
      startY: 125,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        lineColor: [200, 200, 200],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: corPrimaria,
        textColor: 255,
        fontStyle: 'bold',
        fontSize: 9,
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252],
      },
      columnStyles: {
        0: { cellWidth: 35 }, // Nome
        1: { cellWidth: 30 }, // Tipo
        2: { cellWidth: 20 }, // CA
        3: { cellWidth: 25 }, // Fabricante
        4: { cellWidth: 25 }, // Validade
        5: { cellWidth: 20 }, // Status
        6: { cellWidth: 25 }, // Dias
      },
      didParseCell: function(data) {
        // Colorir células de status
        if (data.column.index === 5) { // Coluna Status
          if (data.cell.text[0] === 'vencido') {
            data.cell.styles.fillColor = corPerigo;
            data.cell.styles.textColor = 255;
          } else if (data.cell.text[0] === 'próximo do vencimento') {
            data.cell.styles.fillColor = corAtencao;
            data.cell.styles.textColor = 0;
          } else {
            data.cell.styles.fillColor = corSucesso;
            data.cell.styles.textColor = 255;
          }
        }
      }
    });

    // Adicionar observações
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.setTextColor(...corPrimaria);
    doc.text('OBSERVAÇÕES IMPORTANTES:', 20, finalY);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('• EPIs vencidos devem ser substituídos imediatamente', 20, finalY + 8);
    doc.text('• EPIs próximos do vencimento devem ser renovados em breve', 20, finalY + 15);
    doc.text('• Manter sempre o controle de validade atualizado', 20, finalY + 22);
    doc.text('• Realizar inspeções periódicas dos equipamentos', 20, finalY + 29);
    
    // Rodapé
    doc.setFontSize(8);
    doc.setTextColor(...corSecundaria);
    doc.text('Relatório gerado automaticamente pelo Sistema SegurançaPro', 105, 280, { align: 'center' });
    
    doc.save(`relatorio-epis-${format(new Date(), 'dd-MM-yyyy-HHmm', { locale: ptBR })}.pdf`);
  };

  const gerarRelatorioExcel = () => {
    // Criar dados formatados para Excel
    const dados = epis.map(epi => ({
      'Nome do EPI': epi.nome,
      'Tipo de Proteção': epi.tipo,
      'Número do CA': epi.ca,
      'Fabricante': epi.fabricante,
      'Data de Validade': format(new Date(epi.validade), 'dd/MM/yyyy', { locale: ptBR }),
      'Status Atual': epi.status,
      'Dias para Vencimento': epi.diasParaVencer > 0 ? `${epi.diasParaVencer} dias` : `${Math.abs(epi.diasParaVencer)} dias vencido`,
      'Observações': epi.status === 'vencido' ? 'URGENTE - Substituir imediatamente' : 
                    epi.status === 'próximo do vencimento' ? 'ATENÇÃO - Renovar em breve' : 'OK'
    }));

    // Criar conteúdo CSV com formatação melhorada
    const headers = Object.keys(dados[0]);
    
    // Adicionar linha de título
    const titulo = 'RELATÓRIO DE EQUIPAMENTOS DE PROTEÇÃO INDIVIDUAL (EPIs)';
    const dataRelatorio = `Gerado em: ${format(new Date(), 'dd/MM/yyyy às HH:mm', { locale: ptBR })}`;
    const totalEPIs = `Total de EPIs: ${epis.length}`;
    const epiValidos = `EPIs Válidos: ${epis.filter(e => e.status === 'válido').length}`;
    const epiVencidos = `EPIs Vencidos: ${epis.filter(e => e.status === 'vencido').length}`;
    const epiProximos = `Próximos do Vencimento: ${epis.filter(e => e.status === 'próximo do vencimento').length}`;
    
    // Criar linhas de estatísticas
    const estatisticas = [
      '',
      titulo,
      '',
      dataRelatorio,
      totalEPIs,
      epiValidos,
      epiVencidos,
      epiProximos,
      '',
      'DADOS DETALHADOS DOS EPIs',
      ''
    ];

    // Criar cabeçalho da tabela
    const cabecalho = headers.map(header => `"${header}"`).join(',');
    
    // Criar linhas de dados
    const linhasDados = dados.map(row => 
      headers.map(header => `"${row[header]}"`).join(',')
    );

    // Combinar todo o conteúdo
    const csvContent = [
      ...estatisticas,
      cabecalho,
      ...linhasDados,
      '',
      'OBSERVAÇÕES:',
      '- EPIs vencidos devem ser substituídos imediatamente',
      '- EPIs próximos do vencimento devem ser renovados em breve',
      '- Manter sempre o controle de validade atualizado',
      '',
      'Relatório gerado automaticamente pelo Sistema SegurançaPro'
    ].join('\n');

    // Criar e baixar o arquivo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `relatorio-epis-${format(new Date(), 'dd-MM-yyyy-HHmm', { locale: ptBR })}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const estatisticas = {
    total: epis.length,
    validos: epis.filter(epi => epi.status === 'válido').length,
    vencidos: epis.filter(epi => epi.status === 'vencido').length,
    proximosVencimento: epis.filter(epi => epi.status === 'próximo do vencimento').length,
    tipos: epis.reduce((acc, epi) => {
      acc[epi.tipo] = (acc[epi.tipo] || 0) + 1;
      return acc;
    }, {})
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Relatórios Avançados</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Gere relatórios detalhados em PDF e Excel com formatação profissional</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={gerarRelatorioPDF} className="text-xs sm:text-sm bg-blue-600 hover:bg-blue-700">
            <FileText className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
          <Button onClick={gerarRelatorioExcel} variant="outline" className="text-xs sm:text-sm border-green-600 text-green-600 hover:bg-green-50">
            <Download className="w-4 h-4 mr-2" />
            Exportar Excel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-blue-800">Relatório PDF</h3>
                <p className="text-sm text-blue-700">Formatação profissional com cores, estatísticas e observações importantes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Download className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-800">Relatório Excel</h3>
                <p className="text-sm text-green-700">Dados organizados com estatísticas, observações e formatação adequada</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de EPIs</p>
                <p className="text-2xl font-bold">{estatisticas.total}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">EPIs Válidos</p>
                <p className="text-2xl font-bold text-green-600">{estatisticas.validos}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">EPIs Vencidos</p>
                <p className="text-2xl font-bold text-red-600">{estatisticas.vencidos}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Próximos do Vencimento</p>
                <p className="text-2xl font-bold text-yellow-600">{estatisticas.proximosVencimento}</p>
              </div>
              <Calendar className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Distribuição por Tipo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(estatisticas.tipos).map(([tipo, quantidade]) => (
              <div key={tipo} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm sm:text-base font-medium">{tipo}</span>
                <Badge variant="secondary" className="text-xs sm:text-sm">
                  {quantidade}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Dados dos EPIs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Nome</th>
                  <th className="text-left p-2">Tipo</th>
                  <th className="text-left p-2">CA</th>
                  <th className="text-left p-2">Validade</th>
                  <th className="text-left p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {epis.map((epi) => (
                  <tr key={epi.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{epi.nome}</td>
                    <td className="p-2">{epi.tipo}</td>
                    <td className="p-2">{epi.ca}</td>
                    <td className="p-2">{format(new Date(epi.validade), 'dd/MM/yyyy', { locale: ptBR })}</td>
                    <td className="p-2">
                      <Badge 
                        variant={epi.status === 'válido' ? 'default' : epi.status === 'vencido' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {epi.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RelatoriosAvancados; 