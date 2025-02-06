import { Component, OnInit } from '@angular/core';
import { UserService, Item } from '../services/user.service'; // Assurez-vous que le chemin est correct
import { CommonModule } from '@angular/common'; // Importer CommonModule
import { FormsModule } from '@angular/forms'; // Importer FormsModule
import { Router } from '@angular/router'; // Importer Router

@Component({
    selector: 'app-liste-utilisateur',
    standalone: true,
    templateUrl: './liste-utilisateur.component.html',
    imports: [CommonModule, FormsModule],
    styleUrls: ['./liste-utilisateur.component.css']
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
    isDarkMode: boolean = false; // État initial du mod<th>Code Secret</th>e sombre
    selectedRole: string = ''; // Pour le filtre de rôle
    selectedStatus: string = ''; // Pour le filtre de statut
    noUsersFound: boolean = false; // Ajoutez cette ligne






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
                this.updatePaginatedItems(); // Mettre à jour les éléments paginés
            },
            (error) => {
                console.error('Erreur lors de la récupération des utilisateurs', error);
            }
        );
    }

    // Mettre à jour les utilisateurs affichés en fonction de la page et des filtres
    updatePaginatedItems() {
        const filteredItems = this.items.filter(user => {
            const roleMatch = this.selectedRole ? user.role === this.selectedRole : true;
            const statusMatch = this.selectedStatus ? user.status.toString() === this.selectedStatus : true;
            return roleMatch && statusMatch;
        });
    
        this.noUsersFound = filteredItems.length === 0; // Mettez à jour la variable
    
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        this.paginatedItems = filteredItems.slice(start, end);
    }

    // Méthode pour aller à la page suivante
    nextPage() {
        if (this.currentPage < this.getTotalPages()) {
            this.currentPage++;
            this.updatePaginatedItems();
        }
    }

    // Méthode pour aller à la page précédente
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updatePaginatedItems();
        }
    }

    // Obtenir le nombre total de pages
    getTotalPages(): number {
        return Math.ceil(this.items.length / this.itemsPerPage);
    }

    // Méthode pour aller à une page spécifique
    goToPage(page: number) {
        this.currentPage = page;
        this.updatePaginatedItems();
    }

    // Méthode pour afficher le modal de confirmation
    deleteUser(user: Item) {
        this.userToDelete = user._id; // Stocker l'ID de l'utilisateur à supprimer
        this.showModal = true; // Afficher le modal
    }

    // Méthode pour confirmer la suppression
    confirmDelete() {
        if (this.userToDelete) {
            this.userService.deleteItem(this.userToDelete).subscribe(() => {
                this.items = this.items.filter(user => user._id !== this.userToDelete);
                this.updatePaginatedItems(); // Mettre à jour la liste paginée
                this.showModal = false; // Fermer le modal
                this.userToDelete = null; // Réinitialiser l'utilisateur à supprimer
            });
        }
    }

    // Méthode pour annuler la suppression
    cancelDelete() {
        this.showModal = false; // Fermer le modal
        this.userToDelete = null; // Réinitialiser l'utilisateur à supprimer
    }

    // Méthode pour basculer la sélection de tous les utilisateurs
    toggleSelectAll() {
        const currentPageUsers = this.paginatedItems; // Utilisateurs de la page actuelle
        const allSelected = currentPageUsers.every(user => user.selected); // Vérifie si tous sont sélectionnés
        currentPageUsers.forEach(user => user.selected = !allSelected); // Inverse la sélection
        this.selectAll = !allSelected; // Met à jour l'état de "Tout sélectionner"
    }

    // Méthode pour mettre à jour le statut de 'selectAll'
    updateSelection() {
        const currentPageUsers = this.paginatedItems; // Utilisateurs de la page actuelle
        this.selectAll = currentPageUsers.every(user => user.selected); // Met à jour l'état de "Tout sélectionner"
    }

    // Compter le nombre d'utilisateurs sélectionnés
    get selectedCount(): number {
        return this.items.filter(user => user.selected).length;
    }

   

    // Méthode pour naviguer vers la page d'ajout d'utilisateur
    navigateToAddUser() {
        this.router.navigate(['/ajout-utilisateur']); // Redirection vers la page d'ajout
    }

    navigateToUpdateUser(id: string) {
        console.log('Navigating to update user with ID:', id); // Ajoutez ce log pour vérifier l'ID
        this.router.navigate(['/modifier-utilisateur', id]);
    }

    // Méthode pour changer le rôle d'un utilisateur
    toggleRole(user: Item) {
    // Inverser le rôle actuel
    const newRole = user.role === 'Utilisateur' ? 'Super Admin' : 'Utilisateur';

    // Créer un objet à envoyer à l'API
    const updatedUserData = { ...user, role: newRole };

    // Appeler le service pour mettre à jour l'utilisateur
    this.userService.updateItem(user._id, updatedUserData).subscribe(updatedUser => {
        user.role = updatedUser.role; // Mettre à jour le rôle localement
    });
}

    // Méthode pour créer un nouvel utilisateur
    createUser(newUser: FormData) {
        this.userService.createItem(newUser).subscribe(addedUser => {
            this.items.push(addedUser); // Ajouter l'utilisateur à la liste
        });
    }

    // Méthode pour récupérer un utilisateur par ID
    getUserById(id: string) {
        this.userService.getItemById(id).subscribe(user => {
            console.log(user); // Traitez l'utilisateur comme nécessaire
        });
    }

    // Méthode pour mettre à jour un utilisateur
    updateUser(id: string, updatedUserData: Item) {
        this.userService.updateItem(id, updatedUserData).subscribe(updatedUser => {
            const index = this.items.findIndex(user => user._id === id);
            if (index !== -1) {
                this.items[index] = updatedUser; // Mettre à jour l'utilisateur dans la liste
            }
        });
    }

    // Méthode pour supprimer un utilisateur par ID
    // deleteUser(id: string) {
    //     this.userService.deleteItem(id).subscribe(() => {
    //         this.items = this.items.filter(user => user._id !== id); // Retirer l'utilisateur supprimé
    //     });
    // }

    // Méthode pour rechercher un utilisateur par numéro de téléphone
    searchUser() {
        console.log('searchUser called with:', this.searchQuery);
        
        if (this.searchQuery) {
            this.userService.searchByPhoneNumber(this.searchQuery).subscribe(
                (data: Item[]) => {
                    console.log('Data received:', data);
                    this.items = data; // Met à jour les utilisateurs avec les résultats de la recherche
                    this.currentPage = 1; // Réinitialiser à la première page
                    this.updatePaginatedItems(); // Met à jour les éléments paginés
                },
                (error) => {
                    console.error('Erreur lors de la recherche d\'utilisateurs', error);
                }
            );
        } else {
            // Si la recherche est vide, recharge tous les utilisateurs
            this.getItems(); // Recharge tous les utilisateurs
        }
    }

    // Méthode pour ouvrir le modal de confirmation de suppression multiple
    openDeleteMultipleConfirmationModal() {
        this.showModal = true; // Afficher le modal
    }

    // Méthode pour confirmer la suppression multiple
    confirmDeleteMultiple() {
        // Appeler directement la méthode deleteSelectedUsers
        this.deleteSelectedUsers(); // Supprime les utilisateurs sélectionnés
        this.showModal = false; // Fermer le modal
    }

    // Méthode pour supprimer les utilisateurs sélectionnés
    deleteSelectedUsers() {
        const idsToDelete = this.items.filter(user => user.selected).map(user => user._id);
        if (idsToDelete.length > 0) {
            this.userService.deleteMultipleItems(idsToDelete).subscribe(() => {
                this.items = this.items.filter(user => !user.selected);
                this.selectAll = false; // Réinitialiser la sélection
                this.updatePaginatedItems(); // Mettre à jour la liste paginée
            }, error => {
                console.error('Erreur lors de la suppression des utilisateurs:', error);
            });
        }
    }

    // Méthode pour annuler la suppression multiple
    cancelDeleteMultiple() {
        this.showModal = false; // Fermer le modal
    }

    toggleStatus(user: Item) {
        // Inverser le statut actuel
        const newStatus = !user.status;

        // Créer un objet à envoyer à l'API
        const updatedUserData = { ...user, status: newStatus };

        // Appeler le service pour mettre à jour l'utilisateur
        this.userService.updateItem(user._id, updatedUserData).subscribe(updatedUser => {
            user.status = updatedUser.status; // Mettre à jour le statut localement
        });
    }

    
    // Filtrer les utilisateurs
    filterUsers() {
        this.updatePaginatedItems(); // Recalculer les utilisateurs paginés après filtrage
    }

    // Ajoutez une propriété pour stocker le fichier sélectionné
    selectedFile: File | null = null;

    // Méthode pour ouvrir la boîte de dialogue de fichier CSV
    onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0]; // Récupérer le fichier sélectionné
    }

    // Méthode pour importer le fichier CSV
    importCsv() {
        if (this.selectedFile) {
            this.userService.importCsv(this.selectedFile).subscribe(
                (response) => {
                    console.log('CSV importé avec succès', response);
                    this.getItems(); // Rafraîchir la liste des utilisateurs après importation
                },
                (error) => {
                    console.error('Erreur lors de l\'importation du CSV', error);
                }
            );
        } else {
            alert('Veuillez sélectionner un fichier CSV avant d\'importer.');
        }
    }


}