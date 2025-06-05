import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Incident } from '../models/incident.model';


@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private incidents: Incident[] = [
    {
      id: 1,
      title: 'Problema con el monitor',
      description: 'El monitor no enciende al conectar.',
      category: 'hardware',
      priority: 'Alta',
      createdAt: new Date("2025-03-22"),
      openingTime: new Date("2025-03-22 08:00"),
      closingTime: new Date("2025-03-22 10:00"),
      assignedTo: "pepito",
      status: "abierto",
      resolution: "Se reemplazó el cable de alimentación."
    },
    {
      id: 2,
      createdAt: new Date("2025-01-05"),
      category: 'software',
      description: 'No se puede abrir Excel, muestra error de licencia.',
      assignedTo: "Juan Perez",
      status: "abierto",
      priority: 'Media',
      title: "Error de licencia Excel",
      openingTime: new Date("2025-01-05 09:00"),
      closingTime: new Date("2025-01-05 17:00"),
      resolution: "Licencia reactivada"
    },
    {
      id: 3,
      createdAt: new Date("2025-05-15"),
      category: 'seguridad',
      description: 'Intento de acceso no autorizado detectado.',
      assignedTo: "Maria Rodriguez",
      status: "abierto",
      priority: 'Baja',
      title: "Intento de acceso no autorizado",
      openingTime: new Date("2025-05-15 10:00"),
      closingTime: new Date("2025-05-15 18:00"),
      resolution: "Acceso bloqueado"
    },
    {
      id: 4,
      createdAt: new Date("2025-05-25"),
      category: 'red',
      description: 'Corte general de internet en el segundo piso.',
      assignedTo: "Carlos Gomez",
      status: "cerrado",
      priority: 'Alta',
      title: "Corte de internet",
      openingTime: new Date("2025-05-25 11:00"),
      closingTime: new Date("2025-05-25 19:00"),
      resolution: "Se reinicio el router"
    },
    {
      id: 5,
      createdAt: new Date("2025-05-25"),
      category: 'hardware',
      description: 'La impresora no responde al enviar trabajos.',
      assignedTo: "Ana Martinez",
      status: "cerrado",
      priority: 'Alta',
      title: "Impresora no responde",
      openingTime: new Date("2025-05-25 12:00"),
      closingTime: new Date("2025-05-25 20:00"),
      resolution: "Se cambio el toner"
    }
  ];
  constructor() {}

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