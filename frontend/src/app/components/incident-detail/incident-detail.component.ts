import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { IncidentService } from '../../services/incident.service';
import { Incident } from '../../models/incident.model';
import jsPDF from 'jspdf';

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

  // Variables del componente
  incidents: Incident[] = [];
  incident: Incident | null = null;
  selectedIncidentIndex: number | null = null;
  resolutionNotes: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private incidentService: IncidentService
  ) {}

  ngOnInit(): void {
    this.loadIncidents();
  }

  loadIncidents(): void {
    try {
      this.incidents = this.incidentService.getIncidents();
      console.log('Incidentes cargados:', this.incidents); // Para debug
      
      if (this.incidents.length > 0) {
        this.selectedIncidentIndex = 0;
        this.incident = this.incidents[0];
      }
    } catch (error) {
      console.error('Error al cargar incidentes:', error);
      alert('Error al cargar los incidentes');
    }
  }

  onIncidentChange(index: string | number): void {
    // Convertir a número si es string
    const numIndex = typeof index === 'string' ? parseInt(index, 10) : index;
    
    console.log('Cambiando a incidente índice:', numIndex); // Para debug
    
    if (!isNaN(numIndex) && numIndex >= 0 && numIndex < this.incidents.length) {
      this.selectedIncidentIndex = numIndex;
      this.incident = this.incidents[numIndex];
      this.resolutionNotes = ''; // Limpiar notas al cambiar incidente
      console.log('Incidente seleccionado:', this.incident); // Para debug
    } else {
      console.error('Índice inválido:', numIndex);
    }
  }

  saveChanges(): void {
    if (!this.incident || this.selectedIncidentIndex === null) {
      alert('No hay incidente seleccionado');
      return;
    }

    try {
      console.log('Guardando cambios:', this.incident);
      console.log('Notas de resolución:', this.resolutionNotes);
      
      // Actualizar el incidente en el servicio
      this.incidentService.updateIncident(this.selectedIncidentIndex, this.incident);
      
      alert('Se guardaron los cambios exitosamente');
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      alert('Error al guardar los cambios');
    }
  }

  generateReport(): void {
    if (!this.incident) {
      alert('No hay incidente seleccionado para generar el informe');
      return;
    }

    try {
      const doc = new jsPDF();
      
      // Configuración de colores
      const primaryColor = [26, 115, 232]; // Azul
      const secondaryColor = [240, 240, 240]; // Gris claro
      const textColor = [51, 51, 51]; // Gris oscuro

      // Encabezado
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 0, 210, 40, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('INFORME DE INCIDENTE', 105, 20, { align: 'center' });
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.text('InfraTech S.A', 105, 30, { align: 'center' });

      // Información del incidente
      let yPosition = 60;
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('INFORMACIÓN DEL INCIDENTE', 20, yPosition);

      yPosition += 15;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');

      // Datos del incidente
      const incidentData = [
        { label: 'Categoría:', value: this.incident.category || 'N/A' },
        { label: 'Estado:', value: this.incident.status || 'N/A' },
        { label: 'Prioridad:', value: this.incident.priority || 'N/A' },
        { label: 'Responsable:', value: this.incident.assignedTo || 'Sin asignar' },
        { label: 'Fecha de Creación:', value: this.formatDate(this.incident.createdAt) },
        { label: 'Fecha del Informe:', value: this.formatDate(new Date()) }
      ];

      incidentData.forEach((item, index) => {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 30;
        }

        // Fondo para las filas pares
        if (index % 2 === 0) {
          doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
          doc.rect(15, yPosition - 5, 180, 10, 'F');
        }

        doc.setFont('helvetica', 'bold');
        doc.text(item.label, 20, yPosition);
        doc.setFont('helvetica', 'normal');
        doc.text(item.value, 80, yPosition);
        yPosition += 12;
      });

      // Descripción
      yPosition += 10;
      if (yPosition > 230) {
        doc.addPage();
        yPosition = 30;
      }

      doc.setFont('helvetica', 'bold');
      doc.text('DESCRIPCIÓN:', 20, yPosition);
      yPosition += 10;

      doc.setFont('helvetica', 'normal');
      const description = this.incident.description || 'Sin descripción';
      const descriptionLines = doc.splitTextToSize(description, 170);
      doc.text(descriptionLines, 20, yPosition);
      yPosition += descriptionLines.length * 6 + 10;

      // Comentarios/Resolución
      if (this.resolutionNotes && this.resolutionNotes.trim()) {
        if (yPosition > 230) {
          doc.addPage();
          yPosition = 30;
        }

        doc.setFont('helvetica', 'bold');
        doc.text('COMENTARIOS/RESOLUCIÓN:', 20, yPosition);
        yPosition += 10;

        doc.setFont('helvetica', 'normal');
        const resolutionLines = doc.splitTextToSize(this.resolutionNotes, 170);
        doc.text(resolutionLines, 20, yPosition);
      }

      // Pie de página
      const pageCount = (doc as any).internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(
          `Página ${i} de ${pageCount} - Generado el ${this.formatDateTime(new Date())}`,
          105,
          285,
          { align: 'center' }
        );
      }

      // Guardar el PDF
      const incidentId = this.selectedIncidentIndex !== null ? this.selectedIncidentIndex + 1 : 'Sin_ID';
      const fileName = `Informe_Incidente_${incidentId}_${this.formatDateForFile(new Date())}.pdf`;
      doc.save(fileName);

      alert('Informe PDF generado exitosamente');

    } catch (error) {
      console.error('Error al generar el PDF:', error);
      alert('Error al generar el informe PDF. Revisa la consola para más detalles.');
    }
  }

  private formatDate(date: Date): string {
    if (!date) return 'Fecha no disponible';
    try {
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      return 'Fecha inválida';
    }
  }

  private formatDateTime(date: Date): string {
    if (!date) return 'Fecha no disponible';
    try {
      return date.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Fecha inválida';
    }
  }

  private formatDateForFile(date: Date): string {
    if (!date) return 'fecha_invalida';
    try {
      return date.toISOString().split('T')[0].replace(/-/g, '');
    } catch (error) {
      return 'fecha_invalida';
    }
  }

  goBack(): void {
    this.router.navigate(['/Lista-Incidente']);
  }
}