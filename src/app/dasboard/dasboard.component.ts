import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../data.service';
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
  lightLevel: string | number = '--';
  temperature: string | number = '--';

  constructor(private dataService: DataService) { }

  ngAfterViewInit() {
    this.dataService.getData().subscribe(
      (response) => {
        // Vérifie que les données existent
        if (response && response.data) {
          this.humidity = response.data.humidity;
          this.lightLevel = response.data.lightLevel;
          this.temperature = response.data.temperature;

          // Mettre à jour les graphiques avec les données reçues
          this.updateCharts(response.data);  
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
  createHumidityChart(humidityData: number[]) {
    new Chart(this.humidityChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        datasets: [{
          label: 'Humidité',
          data: humidityData, // Utilise les données d'humidité récupérées
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
  }

  // Création du graphique de lumière
  createLightChart(lightData: number[]) {
    new Chart(this.lightChart.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Lun', 'Mar', 'Mer'],
        datasets: [{
          data: lightData, // Utilise les données de lumière récupérées
          backgroundColor: ['#a3e635', '#16a34a', '#166534']
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  // Méthode pour mettre à jour les graphiques
  updateCharts(data: any) {
    // Exemple de structure des données (tu devras peut-être ajuster en fonction des données reçues)
    const humidityData = [data.humidity, 30, 35, 25, 42, 45, 48]; // Humidité sur 7 jours (ajuste les valeurs)
    const lightData = [62, 20, 6];  // Données de lumière (ajuste selon la réponse)

    this.createHumidityChart(humidityData);
    this.createLightChart(lightData);
  }
}
