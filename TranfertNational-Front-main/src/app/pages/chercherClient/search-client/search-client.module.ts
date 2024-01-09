import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModule } from '../../../Shared/nz/nz.module';

import { SearchClientRoutingModule } from './search-client-routing.module';
import { SearchClientComponent } from './search-client.component';


@NgModule({
  declarations: [
    SearchClientComponent
  ],
  imports: [
    NzModule,
    CommonModule,
    SearchClientRoutingModule
  ]
})
export class SearchClientModule { }
