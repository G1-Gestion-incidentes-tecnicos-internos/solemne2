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
      status: '',
      assignedTo: '',
      createdAt: new Date('2025-03-22'),
      category: 'Hardware',
      priority: 'Alto'
    },
    {
      id: 2,
      title: 'Fallo de software',
      description: 'No se puede abrir el programa de gestión',
      status: '',
      assignedTo: '',
      createdAt: new Date('2025-04-10'),
      category: 'Software',
      priority: 'Bajo'
    },
    {
      id: 3,
      title: 'Corte de red',
      description: 'Sin acceso a internet en el tercer piso',
      status: '',
      assignedTo: '',
      createdAt: new Date('2025-02-28'),
      category: 'Red',
      priority: 'Resuelto',
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
