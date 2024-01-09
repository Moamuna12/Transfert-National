import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NzModule } from 'src/app/Shared/nz/nz.module';
import { AfficherWalletsComponent } from './afficher-wallets/afficher-wallets.component';
import { AjouterWalletComponent } from './ajouter-wallet/ajouter-wallet.component';


const routes: Routes = [
  {path : "all" , component : AfficherWalletsComponent},

];

@NgModule({

  imports: [
    NzModule,
    RouterModule.forChild(routes),
    CommonModule
  ],

  declarations: [
     AfficherWalletsComponent,
     AjouterWalletComponent

  ]
})
export class WalletModule { }
