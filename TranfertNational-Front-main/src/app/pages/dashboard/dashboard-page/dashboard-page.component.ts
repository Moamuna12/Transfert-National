import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/model/Client.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ClientServiceService } from 'src/app/services/client-service.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  client:Client = new Client();
  constructor(private clientService: ClientServiceService) { }

  ngOnInit(): void {
    var getUser = sessionStorage.getItem("user");
      this.client=JSON.parse(getUser);
      this.clientService.getClient(this.client.idClient).subscribe((res:Client)=>{
        console.log(res.comptes[0].montant);
        this.client=res;
      })
  }
}
