import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { HistoriqueService } from '../../../services/hisrorique.service';
import { CommonModule } from '@angular/common';

interface Arrosage {
  plante: string;
  date: string;
  heure: string;
  type: string;
  volumeEau: number;
  unite: string;
}

@Component({
  selector: 'app-historique-arrosage',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, CommonModule],
  templateUrl: './historique-arrosage.component.html',
  styleUrls: ['./historique-arrosage.component.css']
})
export class HistoriqueArrosageComponent implements OnInit {
  arrosages: Arrosage[] = [];

  constructor(private historiqueService: HistoriqueService) {}

  ngOnInit(): void {
    this.loadArrosages();
  }

  loadArrosages(): void {
    this.historiqueService.getArrosages().subscribe(
      (data) => {
        this.arrosages = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des arrosages', error);
      }
    );
  }
}
