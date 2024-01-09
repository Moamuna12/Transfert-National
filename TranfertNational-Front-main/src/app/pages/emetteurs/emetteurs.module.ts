import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NzModule } from 'src/app/Shared/nz/nz.module';
import { AfficherEmetteursComponent } from './afficher-emetteurs/afficher-emetteurs.component';
import { AjouterEmetteurComponent } from './ajouter-emetteur/ajouter-emetteur.component';


const routes: Routes = [
  {path : "all" , component : AfficherEmetteursComponent},
  {path : "add" , component : AjouterEmetteurComponent},

];

@NgModule({

  imports: [
    NzModule,
    RouterModule.forChild(routes),
    CommonModule
  ],

  declarations: [
     AfficherEmetteursComponent,
     AjouterEmetteurComponent

  ]
})
export class EmetteursModule { }
