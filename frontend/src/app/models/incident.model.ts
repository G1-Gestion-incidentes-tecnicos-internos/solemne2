export interface Incident {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: string;
  createdAt: string;
  openingTime: string; // Nueva propiedad
  closingTime: string; // Nueva propiedad
  assignedTo?: string;
  status?: string;
  resolution?: string;
}