import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { IncidentService, Incident } from '../../services/incident.service';

@Component({
  selector: 'app-incident-statistics',
  templateUrl: './incident-statistics.component.html',
  styleUrls: ['./incident-statistics.component.css']
})
export class IncidentStatisticsComponent implements OnInit {
  
  // Propiedades para el dashboard
  totalIncidents: number = 0;
  resolvedIncidents: number = 0;
  pendingIncidents: number = 0;
  averageResolutionTime: number = 0;

  constructor(private incidentService: IncidentService) {}

  ngOnInit(): void {
    this.calculateDashboardStats();
    
    // Esperar a que el DOM esté completamente renderizado
    setTimeout(() => {
      this.renderCategoryChart();
      this.renderMonthlyChart();
    }, 100);
  }

  calculateDashboardStats() {
    const incidents = this.incidentService.getIncidents();
    
    // Total de incidentes
    this.totalIncidents = incidents.length;
    
    // Incidentes resueltos (estado "cerrado")
    this.resolvedIncidents = incidents.filter(incident => 
      incident.estado.toLowerCase() === 'cerrado'
    ).length;
    
    // Incidentes pendientes (estado "abierto")
    this.pendingIncidents = incidents.filter(incident => 
      incident.estado.toLowerCase() === 'abierto'
    ).length;
    
    // Tiempo promedio de resolución (simulado en días)
    this.averageResolutionTime = this.calculateAverageResolutionTime(incidents);
  }

  private calculateAverageResolutionTime(incidents: Incident[]): number {
    const resolvedIncidents = incidents.filter(incident => 
      incident.estado.toLowerCase() === 'cerrado'
    );
    
    if (resolvedIncidents.length === 0) {
      return 0;
    }
    
    // Simulamos tiempo de resolución basado en prioridad
    const totalDays = resolvedIncidents.reduce((total, incident) => {
      let days = 0;
      switch (incident.prioridad) {
        case 'Alta':
          days = Math.random() * 2 + 1; // 1-3 días
          break;
        case 'Media':
          days = Math.random() * 4 + 3; // 3-7 días
          break;
        case 'Baja':
          days = Math.random() * 7 + 5; // 5-12 días
          break;
      }
      return total + days;
    }, 0);
    
    return Math.round(totalDays / resolvedIncidents.length);
  }

  renderCategoryChart() {
    const categoryCanvas = document.getElementById('categoryChart') as HTMLCanvasElement;
    if (!categoryCanvas) {
      console.error('Canvas categoryChart no encontrado');
      return;
    }

    const incidents = this.incidentService.getIncidents();
    const categoryStats = this.getCategoryStatistics(incidents);
    
    new Chart(categoryCanvas, {
      type: 'pie',
      data: {
        labels: Object.keys(categoryStats),
        datasets: [
          {
            data: Object.values(categoryStats),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40']
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Incidentes por Categoría'
          }
        }
      }
    });
  }

  renderMonthlyChart() {
    const monthlyCanvas = document.getElementById('monthlyChart') as HTMLCanvasElement;
    if (!monthlyCanvas) {
      console.error('Canvas monthlyChart no encontrado');
      return;
    }

    const incidents = this.incidentService.getIncidents();
    const monthlyStats = this.getMonthlyStatistics(incidents);
    
    new Chart(monthlyCanvas, {
      type: 'bar',
      data: {
        labels: Object.keys(monthlyStats),
        datasets: [
          {
            label: 'Incidentes',
            data: Object.values(monthlyStats),
            backgroundColor: '#36A2EB'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Incidentes por Mes'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }

  private getCategoryStatistics(incidents: Incident[]): { [key: string]: number } {
    const stats: { [key: string]: number } = {};
    
    incidents.forEach(incident => {
      const category = this.formatCategoryName(incident.category);
      stats[category] = (stats[category] || 0) + 1;
    });
    
    return stats;
  }

  private getMonthlyStatistics(incidents: Incident[]): { [key: string]: number } {
    const stats: { [key: string]: number } = {};
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    incidents.forEach(incident => {
      const month = monthNames[incident.createdAt.getMonth()];
      stats[month] = (stats[month] || 0) + 1;
    });
    
    return stats;
  }

  private formatCategoryName(category: string): string {
    const categoryMap: { [key: string]: string } = {
      'hardware': 'Hardware',
      'software': 'Software',
      'red': 'Redes',
      'seguridad': 'Seguridad'
    };
    
    return categoryMap[category.toLowerCase()] || 'Otros';
  }
}


