import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/model/Client.model';
import { ClientServiceService } from 'src/app/services/client-service.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {
  constructor(private clientService:ClientServiceService) { }

  ngOnInit() {
    let resp=this.clientService.getAgents();
    resp.subscribe((data : Client[])=>{
      this.listOfData=data;
      this.listOfDisplayData=data;
    })
  }
  searchValue = '';
  visible = false;
  listOfData : Client[] = [];
  listOfDisplayData = [...this.listOfData];

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item) => item.nom.indexOf(this.searchValue) !== -1);
  }
}
