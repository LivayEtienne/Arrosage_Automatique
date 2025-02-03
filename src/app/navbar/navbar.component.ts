import { Component, OnInit } from '@angular/core';
import { UserService, Item } from '../services/user.service'; // Assurez-vous que le chemin est correct
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
export class ListeUtilisateurComponent implements OnInit {
    items: Item[] = [];
    selectAll = false; // Pour gérer la sélection de tous les utilisateurs
    showModal = false; // Pour afficher le modal de confirmation
    userToDelete: string | null = null; // Pour stocker l'ID de l'utilisateur à supprimer
    paginatedItems: Item[] = []; // Utilisateurs paginés
    currentPage: number = 1; // Page actuelle
    itemsPerPage: number = 9; // Nombre d'éléments par page
    searchQuery: string = ''; // Pour stocker la requête de recherche




    constructor(private userService: UserService, private router: Router) {} // Ajouter le Router ici

    ngOnInit(): void {
        this.getItems();
        console.log(this.items); // Vérifiez que chaque utilisateur a un ID
    }

    // Récupérer tous les utilisateurs
    getItems() {
        this.userService.getItems().subscribe(
            (data: Item[]) => {
                this.items = data.map(user => ({ ...user, selected: false }));
            },
            (error) => {
                console.error('Erreur lors de la récupération des utilisateurs', error);
            }
        );
    }

   
    // Méthode pour rechercher un utilisateur par numéro de téléphone
    searchUser() {
        if (this.searchQuery) {
            this.userService.searchByPhoneNumber(this.searchQuery).subscribe(
                (data: Item[]) => {
                    this.items = data; // Met à jour les utilisateurs avec les résultats de la recherche
                },
                (error) => {
                    console.error('Erreur lors de la recherche d\'utilisateurs', error);
                }
            );
        } else {
            this.getItems(); // Recharge tous les utilisateurs si la recherche est vide
        }
    }
}