import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NzModule } from 'src/app/Shared/nz/nz.module';
import { AfficherPointsvComponent } from './afficher-pointsv/afficher-pointsv.component';
import { AjouterPointvComponent } from './ajouter-pointv/ajouter-pointv.component';


const routes: Routes = [
  {path : "all" , component : AfficherPointsvComponent},
  {path : "add" , component : AjouterPointvComponent},

];

@NgModule({

  imports: [
    NzModule,
    RouterModule.forChild(routes),
    CommonModule
  ],

  declarations: [
     AfficherPointsvComponent,
     AjouterPointvComponent

  ]
})
export class PointVenteModule { }
