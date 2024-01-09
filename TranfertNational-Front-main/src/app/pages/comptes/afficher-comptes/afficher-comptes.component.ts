import { Component, OnInit } from '@angular/core';
import { Compte } from 'src/app/model/Compte.model';
import { ClientServiceService } from 'src/app/services/client-service.service';

@Component({
  selector: 'app-afficher-comptes',
  templateUrl: './afficher-comptes.component.html',
  styleUrls: ['./afficher-comptes.component.css']
})
export class AfficherComptesComponent implements OnInit {
  constructor(private clientService:ClientServiceService) { }

  ngOnInit() {
    let resp=this.clientService.getComptes();
    resp.subscribe((data : Compte[])=>{
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
