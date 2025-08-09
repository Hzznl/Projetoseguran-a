import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AlertTriangle, Download, Filter } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useToast } from '../ui/use-toast';

const HistoryLog = ({ history = [] }) => {
  const { toast } = useToast();
  
  // Usamos os dados de histórico passados como prop
  const [filters, setFilters] = useState({
    date: '',
    area: 'all',
    type: 'all'
  });

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredHistory = useMemo(() => {
    return history.filter(item => {
      // Verifica se o item tem uma data válida
      const itemDate = item.time ? new Date(item.time).toISOString().split('T')[0] : '';
      const filterDate = filters.date;
      
      const dateMatch = !filterDate || (itemDate && itemDate === filterDate);
      const areaMatch = filters.area === 'all' || (item.area && item.area === filters.area);
      const typeMatch = filters.type === 'all' || (item.type && item.type === filters.type);

      return dateMatch && areaMatch && typeMatch;
    });
  }, [history, filters]);

  // Função para converter logo em base64
  const getBase64Image = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // permite carregar imagens externas sem CORS bloqueando
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = (err) => reject(err);
    });
  };

  const generateReport = async () => {
    // Usa os dados filtrados para o relatório
    const dataToReport = filteredHistory;
    
    if (dataToReport.length === 0) {
      toast({
        title: "Nenhum dado encontrado",
        description: "Não há registros para gerar o relatório.",
        variant: "destructive",
        className: "bg-destructive border-destructive text-destructive-foreground",
      });
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;

    // Cria um elemento HTML temporário para a tabela
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    document.body.appendChild(tempDiv);

    // Adiciona título e informações
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(34, 197, 94); // Verde
    doc.text('SafetyGuard', pageWidth / 2, 40, { align: 'center' });

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0); // Preto
    doc.text('Relatório de Monitoramento de EPIs', pageWidth / 2, 60, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Data de geração: ${new Date().toLocaleString()}`, margin, 75);
    doc.text(`Total de registros: ${dataToReport.length}`, margin, 85);
    
    // Adiciona informações sobre filtros aplicados
    const hasActiveFilters = filters.date || filters.area !== 'all' || filters.type !== 'all';
    if (hasActiveFilters) {
      doc.text('Filtros aplicados:', margin, 95);
      let filterY = 105;
      if (filters.date) {
        doc.text(`• Data: ${filters.date}`, margin + 10, filterY);
        filterY += 10;
      }
      if (filters.area !== 'all') {
        doc.text(`• Área: ${filters.area}`, margin + 10, filterY);
        filterY += 10;
      }
      if (filters.type !== 'all') {
        doc.text(`• EPI: ${filters.type}`, margin + 10, filterY);
        filterY += 10;
      }
    }

    // Cria a tabela HTML apenas com os dados
    tempDiv.innerHTML = `
      <table id="reportTable" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #2980b9; color: white;">Data/Hora</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #2980b9; color: white;">Tipo de EPI</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #2980b9; color: white;">Área</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #2980b9; color: white;">Severidade</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #2980b9; color: white;">Mensagem</th>
          </tr>
        </thead>
        <tbody>
          ${dataToReport.map(item => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 6px;">${item.time ? new Date(item.time).toLocaleString() : 'Data desconhecida'}</td>
              <td style="border: 1px solid #ddd; padding: 6px;">${item.type || 'N/A'}</td>
              <td style="border: 1px solid #ddd; padding: 6px;">${item.area || 'N/A'}</td>
              <td style="border: 1px solid #ddd; padding: 6px;">${item.severity === 'high' ? 'Alto Risco' : item.severity === 'medium' ? 'Médio Risco' : 'Baixo Risco'}</td>
              <td style="border: 1px solid #ddd; padding: 6px;">${item.message || 'N/A'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    // Calcula a posição da tabela baseada nos filtros
    const tableStartY = hasActiveFilters ? 140 : 130;
    
    // Gera o PDF usando autoTable com HTML
    autoTable(doc, {
      html: '#reportTable',
      bodyStyles: { minCellHeight: 15 },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontSize: 10,
        fontStyle: 'bold'
      },
      bodyStyles: {
        fontSize: 9
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      margin: { top: tableStartY, right: margin, bottom: margin, left: margin }
    });

    // Adiciona rodapé
    const finalY = doc.lastAutoTable?.finalY || 200;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('Relatório gerado automaticamente pelo sistema de monitoramento de EPIs', pageWidth / 2, finalY + 20, { align: 'center' });

    // Remove o elemento temporário
    document.body.removeChild(tempDiv);

    // Salva o PDF
    const fileName = `relatorio-epis-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);

    toast({
      title: "Relatório gerado com sucesso! 📄",
      description: `O arquivo "${fileName}" foi baixado com ${dataToReport.length} registros.`,
      variant: "success",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filtros e Histórico
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Filtros */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-muted/50 rounded-lg">
            <Input
              type="date"
              value={filters.date}
              onChange={(e) => handleFilterChange('date', e.target.value)}
            />
            <Select value={filters.area} onValueChange={(value) => handleFilterChange('area', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por área" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Áreas</SelectItem>
                <SelectItem value="Área A">Área A</SelectItem>
                <SelectItem value="Área B">Área B</SelectItem>
                <SelectItem value="Área C">Área C</SelectItem>
                <SelectItem value="Área D">Área D</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por EPI" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os EPIs</SelectItem>
                <SelectItem value="Capacete">Capacete</SelectItem>
                <SelectItem value="Colete">Colete</SelectItem>
                <SelectItem value="Luvas">Luvas</SelectItem>
                <SelectItem value="Óculos de Proteção">Óculos de Proteção</SelectItem>
                <SelectItem value="Protetor Auricular">Protetor Auricular</SelectItem>
                <SelectItem value="Máscara">Máscara</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={generateReport} className="sm:col-span-2">
              <Download className="h-4 w-4 mr-2" />
              Gerar Relatório
            </Button>
          </div>

          {/* Lista de Histórico */}
          <div className="space-y-2 h-72 overflow-y-auto">
            {filteredHistory.length === 0 ? (
              <p className="text-muted-foreground text-center pt-10">Nenhum registro encontrado.</p>
            ) : (
              filteredHistory.map(item => (
                <div key={item.id} className="flex items-center gap-3 p-2 border rounded-md hover:bg-muted/30 transition-colors">
                  <img
                    src={item.image}
                    alt={`Alerta ${item.type}`}
                    className="w-12 h-12 rounded-md object-contain bg-white p-1"
                    onError={(e) => {
                      // Fallback para imagens que não carregam
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/150?text=EPI';
                    }}
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <Badge variant={
                        item.severity === 'high' ? 'destructive' :
                        item.severity === 'medium' ? 'warning' :
                        'outline'
                      }>
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {item.severity === 'high' ? 'Alto Risco' :
                         item.severity === 'medium' ? 'Médio Risco' :
                         'Baixo Risco'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {item.time ? new Date(item.time).toLocaleString() : 'Data desconhecida'}
                      </span>
                    </div>
                    <p className="font-medium">{item.type}</p>
                    {item.area && <p className="text-sm text-muted-foreground"><strong>Área:</strong> {item.area}</p>}
                    {item.message && <p className="text-sm text-muted-foreground">{item.message}</p>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoryLog;