import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Client } from 'src/app/model/Client.model';
import { ClientServiceService } from 'src/app/services/client-service.service';

@Component({
  selector: 'app-afficher-clients',
  templateUrl: './afficher-clients.component.html',
  styleUrls: ['./afficher-clients.component.css']
})
export class AfficherClientsComponent implements OnInit {
  constructor(private clientService:ClientServiceService) { }

  ngOnInit() {
    let resp=this.clientService.getClients();
    resp.subscribe((data :Client[])=>{
      this.listOfData=data;
      this.listOfDisplayData=data;
    })
  }
  searchValue = '';
  visible = false;
  listOfData = [];
  listOfDisplayData = [...this.listOfData];

  reset(): void {
    this.searchValue = '';
    this.search();
  }

 

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item) => item.age.indexOf(this.searchValue) !== -1);
  }
}
