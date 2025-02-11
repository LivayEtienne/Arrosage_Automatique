import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SensorDataService } from '../sensor-data.service';  
import Chart from 'chart.js/auto';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarLeftComponent } from '../sidebar-left/sidebar-left.component';
import { SidebarRigthComponent } from '../sidebar-rigth/sidebar-rigth.component';

@Component({
  selector: 'app-dasboard',
  standalone: true,
  imports: [NavbarComponent, SidebarLeftComponent, SidebarRigthComponent],
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements AfterViewInit {
  @ViewChild('humidityChart') humidityChart!: ElementRef;
  @ViewChild('lightChart') lightChart!: ElementRef;

  humidity: string | number = '--';
  luminosite: string | number = '--';
  temperature: string | number = '--';

  private temperatureChart: any;  // Référence pour le graphique de température
  private humidityChartInstance: any;  // Référence pour le graphique d'humidité
  private luminositeChart: any;  // Référence pour le graphique de luminosité

  constructor(private sensorDataService: SensorDataService) { }

  ngAfterViewInit() {
    this.sensorDataService.getData().subscribe(
      (response) => {
        if (response && response.temperature !== undefined && response.humidity !== undefined && response.luminosite !== undefined) {
          this.humidity = response.humidity;
          this.temperature = response.temperature;
          this.luminosite = response.luminosite;

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

  // Création ou mise à jour du graphique combiné pour la température et la luminosité (Doughnut)
createCombinedChart(temperatureData: number, humidityData: number, luminositeData: number) {
  const temperatureColor = this.getTemperatureColor(temperatureData); // Récupère la couleur en fonction de la température
  const luminositeColor = '#F39C12'; // Couleur pour la luminosité
  const humidityColor = '#3498db'; // Couleur pour l'humidité

  if (!this.temperatureChart) {
    // Création du graphique si il n'existe pas
    this.temperatureChart = new Chart(this.lightChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Température', 'Humidité', 'Luminosité'],
        datasets: [{
          label: 'Données',
          data: [temperatureData, humidityData, luminositeData], // Valeurs des données
          backgroundColor: [temperatureColor, humidityColor, luminositeColor], // Couleurs respectives
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        rotation: -90,
        cutout: '70%',  // Réduit la taille du trou pour créer un effet visuel
        animation: {
          animateRotate: true, // Animation de rotation lors de la mise à jour
          animateScale: true   // Animation de mise à l'échelle
        }
      }
    });
  } else {
    // Mise à jour des données du graphique combiné
    this.temperatureChart.data.datasets[0].data = [temperatureData, humidityData, luminositeData];
    this.temperatureChart.data.datasets[0].backgroundColor = [temperatureColor, humidityColor, luminositeColor];
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
    this.createCombinedChart(data.temperature, data.humidity, data.luminosite);  // Graphique combiné pour température, humidité et luminosité
  }
  
}
