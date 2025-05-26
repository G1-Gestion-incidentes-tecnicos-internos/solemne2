import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Prioridad = 'Alta' | 'Media' | 'Baja' | '';

interface Incident {
  createdAt: string;
  category: string;
  prioridad: Prioridad;
  title: string;
  descripcion: string;
}

@Component({
  selector: 'app-incident-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.css']
})
export class IncidentFormComponent {
  incident: Incident = {
    createdAt: '',
    category: '',
    prioridad: '', 
    title: '',
    descripcion: '',
  };

  onSubmit() {
    // Establecer la fecha de creación
    this.incident.createdAt = new Date().toISOString();
    
    console.log('Incidente enviado:', this.incident);
    alert('Incidente enviado');

    // Restablecer el formulario
    this.incident = {
      createdAt: '',
      category: '',
      prioridad: '',
      title: '',
      descripcion: '',
    };
  }
}
