
import React from "react";
import { Lead, LeadStatus } from "@/types/Lead";
import LeadCard from "./LeadCard";
import { cn } from "@/lib/utils";

interface LeadColumnProps {
  title: string;
  status: LeadStatus;
  leads: Lead[];
  isDraggingOver: boolean;
  onDragStart: (lead: Lead) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, status: LeadStatus) => void;
}

const LeadColumn: React.FC<LeadColumnProps> = ({
  title,
  status,
  leads,
  isDraggingOver,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  const filteredLeads = leads.filter((lead) => lead.status === status);
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">{title}</h3>
        <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs">
          {filteredLeads.length}
        </span>
      </div>
      
      <div
        className={cn(
          "flex-1 p-2 rounded-md overflow-y-auto",
          isDraggingOver ? "bg-muted/60" : "bg-muted/30"
        )}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, status)}
      >
        {filteredLeads.map((lead) => (
          <div
            key={lead.id}
            draggable
            onDragStart={() => onDragStart(lead)}
          >
            <LeadCard lead={lead} />
          </div>
        ))}
        
        {filteredLeads.length === 0 && (
          <div className="flex items-center justify-center h-24 text-muted-foreground text-sm border border-dashed rounded-md">
            No leads
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadColumn;
