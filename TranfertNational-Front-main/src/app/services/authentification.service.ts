import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Client } from '../model/Client.model';
import { ClientServiceService } from './client-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  client!:Client;
  constructor(private clientService:ClientServiceService,private router: Router) { }

  isLoggedIn(){
    let user = sessionStorage.getItem('user');
    console.log(!(user === null));
    return !(user === null);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("Auth Guard hehe");
    if (this.isLoggedIn()) return true;
    this.router.navigate(['']);
    return true;
  }

  logOut() {
    this.clientService.logout().subscribe((e)=>{
      console.log(e);
    })
    sessionStorage.removeItem('user');
    this.router.navigate(['']);
  }
}
