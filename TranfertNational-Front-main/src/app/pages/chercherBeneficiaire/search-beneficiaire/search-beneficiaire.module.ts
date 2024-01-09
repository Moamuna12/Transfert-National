import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModule } from '../../../Shared/nz/nz.module';

import { SearchBeneficiaireRoutingModule } from './search-beneficiaire-routing.module';
import { SearchBeneficiaireComponent } from './search-beneficiaire.component';


@NgModule({
  declarations: [
    SearchBeneficiaireComponent
  ],
  imports: [
    NzModule,
    CommonModule,
    SearchBeneficiaireRoutingModule
  ]
})
export class SearchBeneficiaireModule { }
