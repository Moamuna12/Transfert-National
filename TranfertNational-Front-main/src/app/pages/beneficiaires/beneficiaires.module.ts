import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NzModule } from 'src/app/Shared/nz/nz.module';
import { AfficherBeneficiairesComponent } from './afficher-beneficiaires/afficher-beneficiaires.component';
import { AjouterBeneficiaireComponent } from './ajouter-beneficiaire/ajouter-beneficiaire.component';


const routes: Routes = [
  {path : "all" , component : AfficherBeneficiairesComponent},
  {path : "add" , component : AjouterBeneficiaireComponent}, 
];

@NgModule({

  imports: [
    NzModule, 
    RouterModule.forChild(routes),
    CommonModule
   
  ],

  declarations: [
     AfficherBeneficiairesComponent,
     AjouterBeneficiaireComponent

  ]
 
})
export class BeneficiairesModule { }