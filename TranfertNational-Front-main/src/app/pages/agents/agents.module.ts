import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentsComponent } from './agents/agents.component';
import { RouterModule, Routes } from '@angular/router';
import { NzModule } from 'src/app/Shared/nz/nz.module';
import { AjouterAgentComponent } from './ajouter-agent/ajouter-agent.component';
import { BloquerTransfertComponent } from '../transfert/bloquer-transfert/bloquer-transfert.component';

const routes: Routes = [
  {path : "all" , component : AgentsComponent},
  {path : "add" , component : AjouterAgentComponent},
  {path : "bloquer" , component : BloquerTransfertComponent},


];

@NgModule({
  declarations: [
    AgentsComponent,
    AjouterAgentComponent
  ],
  imports: [
    NzModule,
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class AgentsModule { }
