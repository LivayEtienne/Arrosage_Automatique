import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SensorDataService } from '../sensor-data.service';  
import Chart from 'chart.js/auto';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-dashutilisateur',
  standalone: true,
  imports: [ NavbarComponent],
  templateUrl: './dashutilisateur.component.html',
  styleUrl: './dashutilisateur.component.css'
})
export class DashutilisateurComponent {
   @ViewChild('humidityChart') humidityChart!: ElementRef;
    @ViewChild('lightChart') lightChart!: ElementRef;
  
    humidity: string | number = '--';
    lightLevel: string | number = '--';
    temperature: string | number = '--';
  
    private temperatureChart: any;  // Référence pour le graphique de température
    private humidityChartInstance: any;  // Référence pour le graphique d'humidité
  
    constructor(private sensorDataService: SensorDataService) { }
  
    ngAfterViewInit() {
      this.sensorDataService.getData().subscribe(
        (response) => {
          if (response && response.temperature !== undefined && response.humidity !== undefined) {
            this.humidity = response.humidity;
            this.temperature = response.temperature;
            this.lightLevel = response.lightLevel !== undefined ? response.lightLevel : '--';
  
            // Mettre à jour les graphiques avec les nouvelles données
            this.updateCharts(response);
          } else {
            console.error('Réponse invalide ou vide');
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération des données:', error);
        }
      );
    }
  
    // Création du graphique d'humidité
    createHumidityChart(humidityData: number) {
      if (!this.humidityChartInstance) {
        this.humidityChartInstance = new Chart(this.humidityChart.nativeElement, {
          type: 'bar',
          data: {
            labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
            datasets: [{
              label: 'Humidité',
              data: [humidityData],
              backgroundColor: 'rgba(0, 255, 0, 0.6)',
              borderColor: 'rgba(0, 255, 0, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: { beginAtZero: true }
            }
          }
        });
      } else {
        // Mise à jour des données d'humidité
        this.humidityChartInstance.data.datasets[0].data = [humidityData];
        this.humidityChartInstance.update();
      }
    }
  
    // Création ou mise à jour du graphique de température (Doughnut)
    createTemperatureChart(temperatureData: number) {
      const temperatureColor = this.getTemperatureColor(temperatureData); // Récupère la couleur en fonction de la température
  
      if (!this.temperatureChart) {
        // Création du graphique si il n'existe pas
        this.temperatureChart = new Chart(this.lightChart.nativeElement, {
          type: 'doughnut',
          data: {
            labels: ['Température'],
            datasets: [{
              data: [temperatureData], // Valeur de température
              backgroundColor: [temperatureColor], // Change la couleur en fonction de la température
            }]
          },
          options: {
            responsive: true,
            animation: {
              animateRotate: true, // Animation de rotation lors de la mise à jour
              animateScale: true   // Animation de mise à l'échelle
            }
          }
        });
      } else {
        // Mise à jour des données de température
        this.temperatureChart.data.datasets[0].data = [temperatureData];
        this.temperatureChart.data.datasets[0].backgroundColor = [temperatureColor]; // Change la couleur
        this.temperatureChart.update();  // Force la mise à jour
      }
    }
  
    // Fonction pour obtenir la couleur du graphique en fonction de la température
    getTemperatureColor(temperature: number): string {
      if (temperature <= 10) {
        return '#3498db'; // Bleu pour les températures basses
      } else if (temperature <= 25) {
        return '#f1c40f'; // Jaune pour les températures modérées
      } else if (temperature <= 28) {
        return '#FF0000'; // Orange pour les températures chaudes
      } else {
        return '#e74c3c'; // Rouge pour les températures élevées
      }
    }
  
    // Méthode pour mettre à jour les graphiques avec les nouvelles données
    updateCharts(data: any) {
      this.createHumidityChart(data.humidity);  // Graphique d'humidité
      this.createTemperatureChart(data.temperature);  // Graphique de température sous forme doughnut
    }
}
