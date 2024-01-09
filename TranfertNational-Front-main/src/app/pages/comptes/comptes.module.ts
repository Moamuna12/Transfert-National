import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NzModule } from 'src/app/Shared/nz/nz.module';
import { AfficherComptesComponent } from './afficher-comptes/afficher-comptes.component';


const routes: Routes = [
  {path : "all" , component : AfficherComptesComponent},

];

@NgModule({

  imports: [
    NzModule,
    RouterModule.forChild(routes),
    CommonModule
  ],

  declarations: [
     AfficherComptesComponent

  ]
})
export class ComptesModule { }
