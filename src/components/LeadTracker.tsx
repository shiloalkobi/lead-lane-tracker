import React, { useState } from "react";
import AddLeadDialog from "./AddLeadDialog";
import LeadColumn from "./LeadColumn";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { Lead, LeadStatus } from "@/types/Lead";

const COLUMN_CONFIG = [
  { title: "New Leads", status: "new" as LeadStatus },
  { title: "Not Closed", status: "in-progress" as LeadStatus },
  { title: "Closed", status: "closed" as LeadStatus },
];

// Sample data for demonstration
const initialLeads: Lead[] = [
  {
    id: uuidv4(),
    name: "Sarah Johnson",
    company: "Acme Inc",
    email: "sarah@acme.com",
    phone: "(555) 123-4567",
    status: "new",
    value: 15000,
    notes: "Interested in our premium plan",
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Michael Smith",
    company: "Tech Solutions",
    email: "michael@techsolutions.com",
    status: "new",
    value: 8500,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "Jessica Williams",
    company: "Global Enterprises",
    email: "jessica@global.com",
    phone: "(555) 987-6543",
    status: "in-progress",
    value: 25000,
    notes: "Follow up next week",
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    name: "David Brown",
    company: "Local Business",
    email: "david@local.com",
    status: "closed",
    value: 12000,
    createdAt: new Date(),
  },
];

const LeadTracker: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<LeadStatus | null>(null);

  const sendLeadWebhook = async (name: string, phone?: string) => {
    try {
      const webhookUrl = "https://hook.eu2.make.com/btgplb8oam9zooqquo1ysuv2cvewm6b2";
      
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone: phone || "N/A",
          timestamp: new Date().toISOString(),
        }),
        mode: "no-cors",
      });
      
      console.log("Webhook sent successfully for lead:", name);
    } catch (error) {
      console.error("Error sending webhook:", error);
    }
  };

  const handleAddLead = (
    newLead: Omit<Lead, "id" | "status" | "createdAt">
  ) => {
    const lead: Lead = {
      ...newLead,
      id: uuidv4(),
      status: "new",
      createdAt: new Date(),
    };
    
    setLeads((prev) => [lead, ...prev]);
    toast.success("New lead added successfully!");
    
    sendLeadWebhook(lead.name, lead.phone);
  };

  const handleDragStart = (lead: Lead) => {
    setDraggedLead(lead);
  };

  const handleDragOver = (e: React.DragEvent, status: LeadStatus) => {
    e.preventDefault();
    setDragOverColumn(status);
  };

  const handleDrop = (e: React.DragEvent, status: LeadStatus) => {
    e.preventDefault();
    
    if (draggedLead && draggedLead.status !== status) {
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === draggedLead.id ? { ...lead, status } : lead
        )
      );
      
      toast.success(`Lead moved to ${getColumnTitle(status)}`);
    }
    
    setDraggedLead(null);
    setDragOverColumn(null);
  };

  const getColumnTitle = (status: LeadStatus): string => {
    const column = COLUMN_CONFIG.find((col) => col.status === status);
    return column ? column.title : "";
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Lead Pipeline</h2>
        <AddLeadDialog onAddLead={handleAddLead} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        {COLUMN_CONFIG.map((column) => (
          <LeadColumn
            key={column.status}
            title={column.title}
            status={column.status}
            leads={leads}
            isDraggingOver={dragOverColumn === column.status}
            onDragStart={handleDragStart}
            onDragOver={(e) => handleDragOver(e, column.status)}
            onDrop={(e) => handleDrop(e, column.status)}
          />
        ))}
      </div>
    </div>
  );
};

export default LeadTracker;
