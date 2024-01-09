import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModule } from 'src/app/Shared/nz/nz.module';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';

const routes: Routes = [
 
  {path : "" , component : LoginPageComponent},

];

@NgModule({
  declarations: [
  
    LoginPageComponent
  ],
  imports: [
    NzGridModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NzModule,
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class LoginModule { }
