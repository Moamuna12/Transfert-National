import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NzModule } from 'src/app/Shared/nz/nz.module';
import { AfficherCcComponent } from './afficher-cc/afficher-cc.component';
import { AjouterCcComponent } from './ajouter-cc/ajouter-cc.component';


const routes: Routes = [
  {path : "all" , component : AfficherCcComponent},
  {path : "add" , component : AjouterCcComponent},


];

@NgModule({

  imports: [
    NzModule,
    RouterModule.forChild(routes),
    CommonModule
  ],

  declarations: [
     AfficherCcComponent,
     AjouterCcComponent

  ]
})
export class CartecreditModule { }
