
export type LeadStatus = "new" | "in-progress" | "closed";

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  status: LeadStatus;
  createdAt: Date;
}
