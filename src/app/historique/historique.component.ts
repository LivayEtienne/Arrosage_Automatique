import { Component, OnInit } from '@angular/core';
import { SidebarLeftComponent } from '../sidebar-left/sidebar-left.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HistoriqueService } from '../historique.service';
import { DeconnexionComponent } from '../deconnexion/deconnexion.component';

interface Arrosage {
  heure: string;
  volumeEau: number;
  uniteVolume: string;
}

interface Historique {
  plantId: {
    nom: string;
    category: string;
    photo: string;
    seuilHumidity: number;
    seuilLuminosity: number;
    volumeEau: number;
    eauUnit: string;
  };
  date: string[];
  nombreFois: number;
  arrosages: Arrosage[];
}

@Component({
  selector: 'app-historique-arrosage',
  standalone: true,
  imports: [NavbarComponent, SidebarLeftComponent, CommonModule, DeconnexionComponent],
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueArrosageComponent implements OnInit {
  historiques: Historique[] = [];

  constructor(private historiqueService: HistoriqueService) {}

  ngOnInit(): void {
    this.loadHistoriques();
  }

  loadHistoriques(): void {
    this.historiqueService.getArrosages().subscribe(
      (data) => {
        this.historiques = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des historiques', error);
      }
    );
  }
}
