import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModule } from '../../Shared/nz/nz.module';

import { AjouterTransfertRoutingModule } from './ajouter-transfert-routing.module';
import { AjouterTransfertComponent } from './ajouter-transfert.component';


@NgModule({
  declarations: [
    AjouterTransfertComponent
  ],
  imports: [
    NzModule,
    CommonModule,
    AjouterTransfertRoutingModule
  ]
})
export class AjouterTransfertModule { }
