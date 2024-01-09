import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NzModule } from 'src/app/Shared/nz/nz.module';
import { AfficherClientsComponent } from './afficher-clients/afficher-clients.component';
import { AjouterClientComponent } from './ajouter-client/ajouter-client.component';


const routes: Routes = [
  {path : "all" , component : AfficherClientsComponent},
  {path : "add" , component : AjouterClientComponent},

];

@NgModule({

  imports: [
    NzModule,
    RouterModule.forChild(routes),
    CommonModule
  ],

  declarations: [
     AfficherClientsComponent,
     AjouterClientComponent

  ]
})
export class ClientsModule { }
