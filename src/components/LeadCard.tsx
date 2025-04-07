
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lead } from "@/types/Lead";
import { cn } from "@/lib/utils";
import { UserRound, Building, Phone, Mail } from "lucide-react";

interface LeadCardProps {
  lead: Lead;
  isDragging?: boolean;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, isDragging }) => {
  return (
    <Card
      className={cn(
        "mb-3 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-all",
        isDragging && "shadow-lg border-blue-400"
      )}
    >
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-base truncate">{lead.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <Building className="h-3.5 w-3.5 mr-2" />
          <span className="truncate">{lead.company}</span>
        </div>
        
        {lead.email && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Mail className="h-3.5 w-3.5 mr-2" />
            <span className="truncate">{lead.email}</span>
          </div>
        )}
        
        {lead.phone && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Phone className="h-3.5 w-3.5 mr-2" />
            <span>{lead.phone}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LeadCard;
