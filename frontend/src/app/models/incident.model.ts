export interface Incident {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: string;
  createdAt: Date;
  openingTime: Date; // Nueva propiedad
  closingTime: Date; // Nueva propiedad
  assignedTo: string;
  status: string;
  resolution?: string;
}
