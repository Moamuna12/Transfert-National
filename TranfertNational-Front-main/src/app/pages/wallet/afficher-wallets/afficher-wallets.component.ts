import { Component, OnInit } from '@angular/core';
import { Wallet } from 'src/app/model/Wallet.model';
import { ClientServiceService } from 'src/app/services/client-service.service';

@Component({
  selector: 'app-afficher-wallets',
  templateUrl: './afficher-wallets.component.html',
  styleUrls: ['./afficher-wallets.component.css']
})
export class AfficherWalletsComponent implements OnInit {
  constructor(private clientService:ClientServiceService) { }

  ngOnInit() {
    let resp=this.clientService.getWallets();
    resp.subscribe((data :Wallet[])=>{
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
