import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { PlantService, PlantData } from '../../../services/plantes.service';
import { CommonModule } from '@angular/common';
import { ProgrammeService } from '../../../services/programme.service';
import { FormsModule } from '@angular/forms';

interface Arrosage {
  heure: string;
  volumeEau: number;
  uniteVolume: string;
}

@Component({
  selector: 'app-arrosage',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './arrosage.component.html',
  styleUrls: ['./arrosage.component.css']
})
export class ArrosageComponent implements OnInit {
  plants: PlantData[] = [];
  showModal = false;
  showModale = false;
  plantForm: FormGroup;
  selectedFile: File | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  plantToDelete: PlantData | null = null;
  showConfirmationModal = false;
  confirmationMessage = '';
  currentPlantId: string | null = null;

  programDates: string[] = [];
  programDuration: string = '';
  programTimes: number = 0;
  programTimesFields: any = {};
  times: number[] = [];
  arrosages: Arrosage[] = [];

  isProgramSubmittedForPlants: { [key: string]: boolean } = {};

  showEditModal = false;
  currentEditProgramId: string | null = null;
  editProgramDates: string[] = [];
  editProgramDuration = '';
  editProgramTimes = 1;
  editProgramTimesFields: any = {};
  editTimes: number[] = [];

  constructor(private fb: FormBuilder, private plantService: PlantService, private programmeService: ProgrammeService) {
    this.plantForm = this.fb.group({
      nom: ['', Validators.required],
      category: ['', Validators.required],
      photo: ['', Validators.required],
      seuilHumidity: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      seuilLuminosity: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      volumeEau: ['', Validators.required],
      eauUnit: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadPlants();
    this.loadProgramSubmittedState();
  }

  openModal() {
    this.showModal = true;
    this.successMessage = null;
    this.errorMessage = null;
  }

  closeModal() {
    this.showModal = false;
    this.plantForm.reset();
    this.selectedFile = null;
    this.successMessage = null;
    this.errorMessage = null;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  submit() {
    if (this.plantForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('nom', this.plantForm.get('nom')!.value);
      formData.append('category', this.plantForm.get('category')!.value);
      formData.append('photo', this.selectedFile);
      formData.append('seuilHumidity', this.plantForm.get('seuilHumidity')!.value);
      formData.append('seuilLuminosity', this.plantForm.get('seuilLuminosity')!.value);
      formData.append('volumeEau', this.plantForm.get('volumeEau')!.value);
      formData.append('eauUnit', this.plantForm.get('eauUnit')!.value);

      this.plantService.createPlant(formData).subscribe(response => {
        this.showSuccessMessage('Plante ajoutée avec succès!');
        this.plants.push(response.plant);
        this.closeModal();
      }, error => {
        this.showErrorMessage('Erreur lors de l\'ajout de la plante.');
        console.error('Error creating plant:', error);
      });
    } else {
      if (!this.selectedFile) {
        this.showErrorMessage('La photo est requise!');
      } else {
        this.showErrorMessage('Le formulaire est invalide.');
      }
    }
  }

  showSuccessMessage(message: string) {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = null;
    }, 1000); // Le message disparaît après 3 secondes
  }

  showErrorMessage(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000); // Le message disparaît après 3 secondes
  }

  loadPlants() {
    this.plantService.getPlants().subscribe(response => {
      this.plants = response;
      console.log('Plantes chargées:', this.plants);
    });
  }

  openConfirmationModal(plant: PlantData) {
    this.plantToDelete = plant;
    this.confirmationMessage = `Êtes-vous sûr de vouloir supprimer la plante "${plant.nom}"?`;
    this.showConfirmationModal = true;
  }

  confirmDelete() {
    if (this.plantToDelete && this.plantToDelete._id) {
      this.deletePlant(this.plantToDelete._id);
    }
    this.closeConfirmationModal();
  }

  closeConfirmationModal() {
    this.showConfirmationModal = false;
    this.plantToDelete = null;
    this.confirmationMessage = '';
  }

  deletePlant(id: string) {
    this.plantService.deletePlant(id).subscribe(response => {
      this.showSuccessMessage('Plante supprimée avec succès!');
      this.plants = this.plants.filter(plant => plant._id !== id);
      this.saveProgramSubmittedState();
    }, error => {
      this.showErrorMessage('Erreur lors de la suppression de la plante.');
      console.error('Error deleting plant:', error);
    });
  }

  selectedPlant: PlantData | null = null;
  selectedPlantPrograms: any[] = [];

  openPlantDetailsModal(plant: any) {
    const plantId = plant._id; // Extrait l'ID de la plante
    this.programmeService.getProgramsForPlant(plantId).subscribe(
      (programs) => {
        if (programs && Array.isArray(programs) && programs.length > 0) {
          this.selectedPlantPrograms = programs;
          this.selectedPlant = {
            _id: plantId,
            nom: plant.nom, // Utilisez les données réelles de la plante
            category: plant.category, // Utilisez les données réelles de la plante
            seuilHumidity: plant.seuilHumidity, // Utilisez les données réelles de la plante
            seuilLuminosity: plant.seuilLuminosity, // Utilisez les données réelles de la plante
            volumeEau: plant.volumeEau, // Utilisez les données réelles de la plante
            eauUnit: plant.eauUnit, // Utilisez les données réelles de la plante
            photo: plant.photo, // Utilisez les données réelles de la plante
            arrosages: programs.flatMap(program => program.arrosages) // Récupérer tous les arrosages des programmes
          };
        } else {
          this.selectedPlant = plant; // Afficher uniquement les détails de la plante
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des programmes:', error);
        this.selectedPlantPrograms = [];
        this.selectedPlant = null;
      }
    );
  }

  closePlantDetailsModal() {
    this.selectedPlant = null;
    this.selectedPlantPrograms = [];
  }

  openProgramModal(plantId: string) {
    this.currentPlantId = plantId;
    this.showModale = true;
    this.programDates = [];
    this.programDuration = '';
    this.programTimes = 1;
    this.updateFieldsForTimes();
    this.isProgramSubmittedForPlants[plantId] = false;
  }

  closeProgramModal() {
    this.showModale = false;
    this.resetProgramFields();
  }

  resetProgramFields() {
    this.programDates = [];
    this.programDuration = '';
    this.programTimes = 1;
    this.programTimesFields = {};
    this.times = [];
  }

  updateFieldsForTimes() {
    this.times = Array(this.programTimes).fill(0).map((_, index) => index + 1);
    this.programTimesFields = {};
    for (let i = 0; i < this.programTimes; i++) {
      this.programTimesFields[i] = {
        time: '',
        volume: 0,
        unit: 'litres'
      };
    }
  }

  submitProgram(plantId: string) {
    if (!plantId) {
      console.error('plantId is null or undefined');
      return;
    }

    if (this.isProgramSubmittedForPlants[plantId]) {
      console.log('Le programme a déjà été soumis pour cette plante !');
      return;
    }

    const program = {
      plantId: plantId,  // Ajouter l'ID de la plante
      date: this.programDates,
      periode: this.programDuration,
      nombreFois: this.programTimes,
      arrosages: [] as Arrosage[]
    };

    for (let i = 0; i < this.programTimes; i++) {
      program.arrosages.push({
        heure: this.programTimesFields[i].time,
        volumeEau: this.programTimesFields[i].volume,
        uniteVolume: this.programTimesFields[i].unit
      });
    }

    this.programmeService.addProgram(program).subscribe(
      (response) => {
        console.log('Réponse de l\'API', response);
        this.showSuccessMessage('Programmation enregistrée avec succès !');
        this.isProgramSubmittedForPlants[plantId] = true;
        this.saveProgramSubmittedState();
        this.closeProgramModal();
        this.resetProgramFields();
      },
      (error) => {
        this.showErrorMessage('Une erreur est survenue lors de l\'enregistrement.');
        console.error('Erreur lors de l\'enregistrement:', error);
      }
    );
  }

  saveProgramSubmittedState() {
    localStorage.setItem('programSubmittedState', JSON.stringify(this.isProgramSubmittedForPlants));
  }

  loadProgramSubmittedState() {
    const savedState = localStorage.getItem('programSubmittedState');
    if (savedState) {
      this.isProgramSubmittedForPlants = JSON.parse(savedState);
    }
  }

  closeEditModal() {
    this.showEditModal = false;
    this.resetEditProgramFields();
  }

  resetEditProgramFields() {
    this.editProgramDates = [];
    this.editProgramDuration = '';
    this.editProgramTimes = 1;
    this.editProgramTimesFields = [];
    this.editTimes = [];
  }

  logBeforeOpenEditModal(plantId: string) {
    console.log('Clic détecté. plantId:', plantId);
    this.currentPlantId = plantId; // Stockez l'ID de la plante

    // Récupérer les programmes associés à la plante
    this.programmeService.getProgramsForPlant(plantId).subscribe(
      (programs) => {
        if (programs && Array.isArray(programs) && programs.length > 0) {
          const programId = programs[0]._id; // Utilisez l'ID du programme (_id)
          console.log('Program ID:', programId); // Ajoutez ce log pour vérifier l'ID
          this.fetchProgramDetails(programId).then(() => {
            this.openEditModal(programId); // Passez l'ID du programme
          }).catch(error => {
            console.error('Erreur lors de la récupération des détails du programme:', error);
            this.showErrorMessage('Erreur lors de la récupération des détails du programme.');
          });
        } else {
          console.warn('Impossible d\'éditer, données non valides');
          this.showErrorMessage('Impossible d\'éditer : Le programme est vide ou non défini.');
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des programmes:', error);
        this.showErrorMessage('Erreur lors de la récupération des programmes.');
      }
    );
  }

  openEditModal(programId: string) {
    console.log('Données reçues pour l\'édition:', programId);

    // Si les données sont valides, procède à l'édition
    this.currentEditProgramId = programId; // Stockez l'ID du programme
    this.showEditModal = true;

    this.updateEditFieldsForTimes();
  }

  fetchProgramDetails(programId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.programmeService.getProgramById(programId).subscribe(
        (program) => {
          console.log('Programme récupéré:', program); // Ajoutez ce log pour vérifier les données récupérées
          if (program && program.date && program.periode && program.nombreFois && program.arrosages) {
            this.editProgramDates = program.date;
            this.editProgramDuration = program.periode;
            this.editProgramTimes = program.nombreFois;

            // Prépare les arrosages pour l'édition
            if (program.arrosages && program.arrosages.length > 0) {
              this.editProgramTimesFields = program.arrosages.map((arrosage: any) => ({
                time: arrosage.heure || '',
                volume: arrosage.volumeEau || 0,
                unit: arrosage.uniteVolume || 'litres'
              }));
            } else {
              this.editProgramTimesFields = Array(this.editProgramTimes).fill({ time: '', volume: 0, unit: 'litres' });
            }

            resolve();
          } else {
            console.error('Données du programme incomplètes ou invalides:', program);
            reject('Données du programme incomplètes ou invalides');
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails du programme:', error);
          reject(error);
        }
      );
    });
  }

  updateEditFieldsForTimes() {
    this.editTimes = Array(this.editProgramTimes).fill(0).map((_, index) => index + 1);
    if (this.editProgramTimesFields.length < this.editProgramTimes) {
      for (let i = this.editProgramTimesFields.length; i < this.editProgramTimes; i++) {
        this.editProgramTimesFields.push({ time: '', volume: 0, unit: 'litres' });
      }
    } else if (this.editProgramTimesFields.length > this.editProgramTimes) {
      this.editProgramTimesFields = this.editProgramTimesFields.slice(0, this.editProgramTimes);
    }
  }

  updateProgram(programId: string) {
    if (!programId) {
      console.error('programId is null or undefined');
      return;
    }

    console.log('Program ID to update:', programId); // Vérifiez l'ID du programme

    const updatedProgram = {
      plantId: this.currentPlantId, // Incluez l'ID de la plante
      date: this.editProgramDates.length > 0 ? this.editProgramDates : null,  // Si vide, on envoie null
      periode: this.editProgramDuration,
      nombreFois: this.editProgramTimes,
      arrosages: [] as Arrosage[]
    };

    for (let i = 0; i < this.editProgramTimes; i++) {
      updatedProgram.arrosages.push({
        heure: this.editProgramTimesFields[i].time,
        volumeEau: this.editProgramTimesFields[i].volume,
        uniteVolume: this.editProgramTimesFields[i].unit
      });
    }

    console.log('Données envoyées au backend:', updatedProgram);  // Vérifiez les données envoyées

    this.programmeService.updateProgram(programId, updatedProgram).subscribe(
      (response) => {
        console.log('Réponse de l\'API', response);
        this.showSuccessMessage('Programmation mise à jour avec succès !');
        this.closeEditModal();
        this.resetEditProgramFields();
      },
      (error) => {
        this.showErrorMessage('Une erreur est survenue lors de la mise à jour.');
        console.error('Erreur lors de la mise à jour:', error);
      }
    );
  }
}
