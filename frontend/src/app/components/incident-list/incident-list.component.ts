import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Incident {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  assignedTo: string;
  createdAt: Date;
  openingTime?: string; // Nueva propiedad añadida
  closingTime?: string; // Nueva propiedad añadida
}

@Component({
  selector: 'app-incident-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentListComponent implements OnInit {
  sortOrder: string = 'newest';

  technicians = ['Juan Pérez', 'María González', 'Carlos Sánchez'];

  // Filter variables
  filterCategory: string = '';
  filterStatus: string = '';
  filterPriority: string = '';
  filterDate: string = ''; // yyyy-mm-dd

  // Original list
  incidents: Incident[] = [
    {
      id: 1,
      title: 'Problemas con el monitor',
      description: 'El monitor no se enciende al conectarlo',
      status: 'Abierto',
      assignedTo: 'Juan Pérez',
      createdAt: new Date('2025-03-22'),
      category: 'Hardware',
      priority: 'Alto',
      openingTime: '13:06', // Nueva propiedad inicializada
    },
    {
      id: 2,
      title: 'Retardo de red',
      description: 'La conexión a internet es muy lenta en el segundo piso.',
      status: 'Progreso',
      assignedTo: 'María González',
      createdAt: new Date('2025-04-02'),
      category: 'Red',
      priority: 'Medio',
      openingTime: '10:00', // Nueva propiedad inicializada
    },
    {
      id: 3,
      title: 'Atasco de impresora',
      description: 'La impresora no imprime y muestra un error de atasco.',
      status: 'Cerrado',
      assignedTo: 'Carlos Sánchez',
      createdAt: new Date('2025-02-15'),
      category: 'Hardware',
      priority: 'Bajo',
      openingTime: '08:45', // Nueva propiedad inicializada
      closingTime: '09:15'  // Nueva propiedad inicializada
    }
  ];

  // Filtered results to show in the UI
  filteredIncidents: Incident[] = [];

  constructor() {}

  ngOnInit(): void {
    this.applyFilters();
  }

  sortIncidents() {
    if (this.sortOrder === 'newest') {
      this.filteredIncidents.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } else {
      this.filteredIncidents.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    }
  }

  applyFilters() {
    this.filteredIncidents = this.incidents.filter(inc => {
      const matchCategory = this.filterCategory ? inc.category === this.filterCategory : true;
      const matchStatus = this.filterStatus ? inc.status === this.filterStatus : true;
      const matchPriority = this.filterPriority ? inc.priority === this.filterPriority : true;
      const matchDate = this.filterDate ? new Date(inc.createdAt) >= new Date(this.filterDate) : true;

      return matchCategory && matchStatus && matchPriority && matchDate;
    });
    this.sortIncidents();
  }
}