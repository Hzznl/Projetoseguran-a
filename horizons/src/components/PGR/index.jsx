import React from 'react';
import PGRDashboard from './PGRDashboard';
import PGRForm from './PGRForm';
import PGRList from './PGRList';

const PGR = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">PGR - Programa de Gerenciamento de Riscos</h1>
          <p className="text-muted-foreground mt-2">
            Identifique, avalie e controle os riscos ocupacionais em sua organização
          </p>
        </div>
      </div>
      
      <PGRDashboard />
      <PGRForm />
      <PGRList />
    </div>
  );
};

export default PGR; 