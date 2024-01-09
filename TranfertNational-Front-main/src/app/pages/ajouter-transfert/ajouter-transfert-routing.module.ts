import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterTransfertComponent } from './ajouter-transfert.component';

const routes: Routes = [{ path: '', component: AjouterTransfertComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjouterTransfertRoutingModule { }
