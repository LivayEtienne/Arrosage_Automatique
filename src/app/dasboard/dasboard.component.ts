import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarLeftComponent } from '../sidebar-left/sidebar-left.component';
import { SidebarRigthComponent } from '../sidebar-rigth/sidebar-rigth.component';

@Component({
  selector: 'app-dasboard',
  standalone: true,
  imports: [NavbarComponent, SidebarLeftComponent, SidebarRigthComponent],
  templateUrl: './dasboard.component.html',
  styleUrl: './dasboard.component.css'
})
export class DasboardComponent implements AfterViewInit {
  @ViewChild('humidityChart') humidityChart!: ElementRef;
  @ViewChild('lightChart') lightChart!: ElementRef;

  humidity: string | number = '--';
  lightLevel: string | number = '--';
  temperature: string | number = '--';

  ngAfterViewInit() {
    this.createHumidityChart();
    this.createLightChart();
  }

  createHumidityChart() {
    new Chart(this.humidityChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        datasets: [{
          label: 'Humidité',
          data: [40, 30, 35, 25, 42, 45, 48],
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

  createLightChart() {
    new Chart(this.lightChart.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Lun', 'Mar', 'Mer'],
        datasets: [{
          data: [62, 20, 6],
          backgroundColor: ['#a3e635', '#16a34a', '#166534']
        }]
      },
      options: {
        responsive: true
      }
    });
  }
}
