import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: 'ajouterTransfert', loadChildren: () => import('../pages/ajouter-transfert/ajouter-transfert.module').then(m => m.AjouterTransfertModule) },
  // { path: 'ajouterBeneficiaire', loadChildren: () => import('../pages/ajouter-beneficiaire/ajouter-beneficiaire.module').then(m => m.AjouterBeneficiaireModule) },
  // { path: 'searchClient', loadChildren: () => import('../pages/chercherClient/search-client/search-client.module').then(m => m.SearchClientModule) },
  // { path: 'agents', loadChildren: () => import('../pages/agents/agents.module').then(m => m.AgentsModule) },
  // { path: 'beneficiaire', loadChildren: () => import('../pages/beneficiaires/beneficiaires.module').then(m => m.BeneficiairesModule) },
  // { path: 'cartecredit', loadChildren: () => import('../pages/cartecredit/cartecredit.module').then(m => m.CartecreditModule) },
  // { path: 'client', loadChildren: () => import('../pages/clients/clients.module').then(m => m.ClientsModule) },
  // { path: 'compte', loadChildren: () => import('../pages/comptes/comptes.module').then(m => m.ComptesModule) },
  // { path: 'emetteur', loadChildren: () => import('../pages/emetteurs/emetteurs.module').then(m => m.EmetteursModule) },
  // { path: 'gichet', loadChildren: () => import('../pages/gichet-billets/gichet-billets.module').then(m => m.GichetBilletsModule) },
  // { path: 'pointvente', loadChildren: () => import('../pages/point-vente/point-vente.module').then(m => m.PointVenteModule) },
  // { path: 'wallet', loadChildren: () => import('../pages/wallet/wallet.module').then(m => m.WalletModule) },
  // { path: 'transfert', loadChildren: () => import('../pages/transfert/transfert.module').then(m => m.TransfertModule) },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
