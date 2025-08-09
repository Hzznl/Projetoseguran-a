
import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const OcorrenciaCard = ({ ocorrencia, onOpenDetails, index, gravidadeOptions }) => {
  const getGravidadeBadge = (gravidade) => {
    const option = gravidadeOptions.find(opt => opt.value === gravidade);
    return (
      <Badge 
        variant="outline" 
        className={`${option?.color} text-white border-none`}
      >
        {option?.label}
      </Badge>
    );
  };

  return (
    <motion.div
      key={ocorrencia.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg">{ocorrencia.tipo}</CardTitle>
            {getGravidadeBadge(ocorrencia.gravidade)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {ocorrencia.descricao}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(ocorrencia.data), "dd/MM/yyyy")}</span>
              <Clock className="h-4 w-4 ml-2" />
              <span>{ocorrencia.hora}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{ocorrencia.local}</span>
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-2"
              onClick={() => onOpenDetails(ocorrencia)}
            >
              Ver detalhes
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OcorrenciaCard;
