import { Component, OnInit } from '@angular/core';
import { CarteDeCredit } from 'src/app/model/CarteDeCredit.model';
import { ClientServiceService } from 'src/app/services/client-service.service';

@Component({
  selector: 'app-afficher-cc',
  templateUrl: './afficher-cc.component.html',
  styleUrls: ['./afficher-cc.component.css']
})
export class AfficherCcComponent implements OnInit {
  constructor(private clientService:ClientServiceService) { }

  ngOnInit() {
    let resp=this.clientService.getCartes();
    resp.subscribe((data : CarteDeCredit[])=>{
      console.log(data);
      this.listOfData=data;
      this.listOfDisplayData=data;
    })
  }

  
  searchValue = '';
  visible = false;
  listOfData : CarteDeCredit [] = [] ;
  listOfDisplayData = [...this.listOfData];

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
  }
}
