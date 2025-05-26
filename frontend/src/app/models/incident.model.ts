export interface Incident {
  id: number;
  title: string;
  description: string;
  status: string;
  assignedTo: string;
  createdAt: Date;
  priority: 'Alta' | 'Media' | 'Baja';
  category: string;
}
