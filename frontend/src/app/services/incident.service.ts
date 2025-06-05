import { Injectable } from '@angular/core';

export interface Incident {
  createdAt: Date;
  category: string;
  descripcion: string;
  responsable: string;
  estado: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
}

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private incidents: Incident[] = [
    {
      createdAt: new Date("2025-03-22"),
      category: 'hardware',
      descripcion: 'El monitor no enciende al conectar.',
      responsable: "pepito",
      estado: "abierto",
      prioridad: 'Alta'
    },
    {
      createdAt: new Date("2025-01-05"),
      category: 'software',
      descripcion: 'No se puede abrir Excel, muestra error de licencia.',
      responsable: "",
      estado: "abierto",
      prioridad: 'Media'
    },
    {
      createdAt: new Date("2025-05-15"),
      category: 'seguridad',
      descripcion: 'Intento de acceso no autorizado detectado.',
      responsable: "",
      estado: "abierto",
      prioridad: 'Baja'
    },
    {
      createdAt: new Date("2025-05-25"),
      category: 'red',
      descripcion: 'Corte general de internet en el segundo piso.',
      responsable: "",
      estado: "cerrado",
      prioridad: 'Alta'
    },
    {
      createdAt: new Date("2025-05-25"),
      category: 'hardware',
      descripcion: 'La impresora no responde al enviar trabajos.',
      responsable: "",
      estado: "cerrado",
      prioridad: 'Alta'
    }
  ];

  getIncidents(): Incident[] {
    return [...this.incidents];
  }

  addIncident(incident: Incident): void {
    this.incidents.push(incident);
  }

  updateIncident(index: number, updatedIncident: Incident): void {
    if (index >= 0 && index < this.incidents.length) {
      this.incidents[index] = updatedIncident;
    }
  }
}