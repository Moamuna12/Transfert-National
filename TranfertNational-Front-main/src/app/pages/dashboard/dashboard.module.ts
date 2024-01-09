import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { NzModule } from 'src/app/Shared/nz/nz.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path : "home" , component : DashboardPageComponent},

];

@NgModule({
  declarations: [
    DashboardPageComponent
  ],
  imports: [
    NzModule,
    RouterModule.forChild(routes),
    CommonModule
  ],
})
export class DashboardModule { }
