import { Component, OnInit } from '@angular/core';
import { PointDeVente } from 'src/app/model/PointDeVente.model';
import { ClientServiceService } from 'src/app/services/client-service.service';

@Component({
  selector: 'app-afficher-pointsv',
  templateUrl: './afficher-pointsv.component.html',
  styleUrls: ['./afficher-pointsv.component.css']
})
export class AfficherPointsvComponent implements OnInit {
  constructor(private clientService:ClientServiceService) { }

  ngOnInit() {
    let resp=this.clientService.getPointDeVentes();
    resp.subscribe((data : PointDeVente[])=>{
      console.log(data);
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
