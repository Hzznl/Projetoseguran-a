
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const OcorrenciasChart = ({ data, tiposOcorrencia }) => {
  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--chart-6))",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ocorrências nos Últimos 7 Dias</CardTitle>
        <CardDescription>Visualização de ocorrências por tipo.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }} />
            {tiposOcorrencia.map((tipo, index) => (
              <Bar 
                key={tipo} 
                dataKey={tipo} 
                stackId="a" 
                fill={colors[index % colors.length]} 
                name={tipo} 
                radius={[index === tiposOcorrencia.length -1 ? 4 : 0, index === tiposOcorrencia.length -1 ? 4 : 0, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default OcorrenciasChart;
