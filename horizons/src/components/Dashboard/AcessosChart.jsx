
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const AcessosChart = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Acessos nos Últimos 7 Dias</CardTitle>
        <CardDescription>Visualização de acessos autorizados e negados.</CardDescription>
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
            <Bar dataKey="autorizados" fill="hsl(var(--success))" name="Autorizados" radius={[4, 4, 0, 0]} />
            <Bar dataKey="negados" fill="hsl(var(--destructive))" name="Negados" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AcessosChart;
