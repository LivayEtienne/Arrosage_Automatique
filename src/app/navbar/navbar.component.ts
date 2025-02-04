import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importer CommonModule
import { FormsModule } from '@angular/forms'; // Importer FormsModule
import { Router } from '@angular/router'; // Importer Router

@Component({
    selector: 'app-liste-utilisateur',
    standalone: true,
    templateUrl: './navbar.component.html',
    imports: [CommonModule, FormsModule],
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


    constructor( private router: Router) {} // Ajouter le Router ici

    ngOnInit(): void {
    }

   
    
}