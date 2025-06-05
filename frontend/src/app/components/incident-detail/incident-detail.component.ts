import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

interface Incident {
  id: number;
  title: string;
  description: string;
  status: string;
  assignedTo: string;
  createdAt: Date;
  category: string;
  priority: string;
  openingTime?: string; // Nueva propiedad añadida
  closingTime?: string; // Nueva propiedad añadida
  resolution?: string;
}

@Component({
  selector: 'app-incident-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.css']
})
export class IncidentDetailComponent implements OnInit {
  // Lista de técnicos ampliada
  technicians: string[] = [
    'Juan Pérez',
    'María González',
    'Carlos Sánchez',
    'Ana Torres',
    'Luis Ramírez',
    'Eduardo Rojas'
  ];

  // Lista de incidentes de ejemplo
  incidents: Incident[] = [
    {
      id: 1,
      title: 'Problemas con el monitor',
      description: 'El monitor no enciende al conectarlo',
      status: 'Abierto',
      assignedTo: 'Juan Pérez',
      createdAt: new Date('2025-03-22'),
      category: 'Hardware',
      priority: 'Alto',
      openingTime: '13:06', // Nueva propiedad inicializada
      closingTime: '14:20'  // Nueva propiedad inicializada
    },
    {
      id: 2,
      title: 'Fallo de software',
      description: 'No se puede abrir el programa de gestión',
      status: 'Progreso',
      assignedTo: 'María González',
      createdAt: new Date('2025-04-10'),
      category: 'Software',
      priority: 'Bajo',
      openingTime: '10:00', // Nueva propiedad inicializada
      closingTime: '11:30'  // Nueva propiedad inicializada
    },
    {
      id: 3,
      title: 'Corte de red',
      description: 'Sin acceso a internet en el tercer piso',
      status: 'Resuelto',
      assignedTo: 'Carlos Sánchez',
      createdAt: new Date('2025-02-28'),
      category: 'Red',
      priority: 'Media',
      openingTime: '08:45', // Nueva propiedad inicializada
      closingTime: '09:15'  // Nueva propiedad inicializada
    }
  ];

  // Incidente actual (puedes seleccionar uno por defecto o por ID)
  incident: Incident = this.incidents[0];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Si quieres seleccionar el incidente por ID desde la ruta:
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    // this.incident = this.incidents.find(i => i.id === id) || this.incidents[0];
  }

  saveChanges(): void {
    console.log('Guardando cambios:', this.incident);
    alert('Se guardaron los cambios');
  }

  goBack(): void {
    this.router.navigate(['/Lista-Incidente']);
  }
}