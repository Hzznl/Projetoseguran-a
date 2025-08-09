import React from 'react';
import PlanoAcaoDashboard from './PlanoAcaoDashboard';
import PlanoAcaoForm from './PlanoAcaoForm';
import PlanoAcaoList from './PlanoAcaoList';

const PlanoAcao = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Plano de Ação</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie ações corretivas e preventivas baseadas nos riscos do PGR
          </p>
        </div>
      </div>
      
      <PlanoAcaoDashboard />
      <PlanoAcaoForm />
      <PlanoAcaoList />
    </div>
  );
};

export default PlanoAcao; 