import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/model/Client.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ClientServiceService } from 'src/app/services/client-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isCollapsed = false;
  client:Client = new Client();
  constructor(private clientService:ClientServiceService,private authService:AuthentificationService) { }

  ngOnInit(): void {
    var getUser = sessionStorage.getItem("user");
      this.client=JSON.parse(getUser);
  
  }

  log(): void {
   this.authService.logOut();
  }

}
