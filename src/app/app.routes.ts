import { Routes } from '@angular/router';
import { DasboardComponent } from './dasboard/dasboard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dasboard', pathMatch: 'full'},
    {path: 'dasboard', component: DasboardComponent}
  ];
  