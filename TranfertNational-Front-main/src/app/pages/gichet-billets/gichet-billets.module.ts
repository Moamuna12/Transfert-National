import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NzModule } from 'src/app/Shared/nz/nz.module';
import { AfficherGichetbComponent } from './afficher-gichetb/afficher-gichetb.component';
import { AjouterGichetbComponent } from './ajouter-gichetb/ajouter-gichetb.component';


const routes: Routes = [
  {path : "all" , component : AfficherGichetbComponent},
  {path : "add" , component : AjouterGichetbComponent},


];

@NgModule({

  imports: [
    NzModule,
    RouterModule.forChild(routes),
    CommonModule
  ],

  declarations: [
     AfficherGichetbComponent,
     AjouterGichetbComponent

  ]
})
export class GichetBilletsModule { }
