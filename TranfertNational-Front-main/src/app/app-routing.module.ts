import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginPageComponent } from './pages/login/login-page/login-page.component';
import { AuthentificationService } from './services/authentification.service';

const routes: Routes = [
  { path: '', loadChildren: () => import('../app/pages/login/login.module').then(m => m.LoginModule) },
  {path:'dashboard',component:HomeComponent, canActivate: [AuthentificationService],children:[
  { path: 'ajouterTransfert', loadChildren: () => import('./pages/ajouter-transfert/ajouter-transfert.module').then(m => m.AjouterTransfertModule) },
  { path: 'searchClient', loadChildren: () => import('./pages/chercherClient/search-client/search-client.module').then(m => m.SearchClientModule) },
  { path: 'agents', loadChildren: () => import('./pages/agents/agents.module').then(m => m.AgentsModule) },
  { path: 'beneficiaire', loadChildren: () => import('./pages/beneficiaires/beneficiaires.module').then(m => m.BeneficiairesModule) },
  { path: 'cartecredit', loadChildren: () => import('./pages/cartecredit/cartecredit.module').then(m => m.CartecreditModule) },
  { path: 'client', loadChildren: () => import('./pages/clients/clients.module').then(m => m.ClientsModule) },
  { path: 'compte', loadChildren: () => import('./pages/comptes/comptes.module').then(m => m.ComptesModule) },
  { path: 'emetteur', loadChildren: () => import('./pages/emetteurs/emetteurs.module').then(m => m.EmetteursModule) },
  { path: 'gichet', loadChildren: () => import('./pages/gichet-billets/gichet-billets.module').then(m => m.GichetBilletsModule) },
  { path: 'pointvente', loadChildren: () => import('./pages/point-vente/point-vente.module').then(m => m.PointVenteModule) },
  { path: 'wallet', loadChildren: () => import('./pages/wallet/wallet.module').then(m => m.WalletModule) },
  { path: 'transfert', loadChildren: () => import('./pages/transfert/transfert.module').then(m => m.TransfertModule) },
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'searchBeneficiaire', loadChildren: () => import('./pages/chercherBeneficiaire/search-beneficiaire/search-beneficiaire.module').then(m => m.SearchBeneficiaireModule) },

  ]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
