import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/model/Client.model';
import { ClientServiceService } from 'src/app/services/client-service.service';

@Component({
  selector: 'app-afficher-beneficiaires',
  templateUrl: './afficher-beneficiaires.component.html',
  styleUrls: ['./afficher-beneficiaires.component.css']
})
export class AfficherBeneficiairesComponent implements OnInit {
  constructor(private clientService:ClientServiceService) { }

  ngOnInit() {
    let resp=this.clientService.getBeneficiaires();
    resp.subscribe((data :Client[])=>{
      console.log(data);
      this.listOfData=data;
      this.listOfDisplayData=data;
    })
  }
  searchValue = '';
  visible = false;
  listOfData = [
   
  ];
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
