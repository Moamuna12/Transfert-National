import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchBeneficiaireComponent } from './search-beneficiaire.component';

const routes: Routes = [{ path: '', component: SearchBeneficiaireComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchBeneficiaireRoutingModule { }
