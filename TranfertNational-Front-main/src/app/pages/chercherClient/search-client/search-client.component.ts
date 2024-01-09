import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Client } from 'src/app/model/Client.model';
import { Emetteur } from 'src/app/model/Emetteur.model';
import { ClientServiceService } from 'src/app/services/client-service.service';

@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.css']
})
export class SearchClientComponent implements OnInit {
  @Input() title?: string;
  @Input() subtitle?: string;
  filteredOptions: String[] = [];
  options = [];
  listClients : Client[];
  selectedClient:Client;
  constructor(private clientService:ClientServiceService,private modal: NzModalRef) {
    this.filteredOptions = this.options;

   }

   destroyModal(value: string): void {
     let clientName=value['nzValue'];
     let nom = clientName.split(" ");
      this.selectedClient= this.listClients.find(i=>i.nom===nom[0]);
      console.log(this.selectedClient);
    this.modal.destroy({ result: this.selectedClient});
  }

  ngOnInit(): void {
    let resp=this.clientService.getEmetteurs();
    resp.subscribe((data :Emetteur[])=>{
      this.listClients=data;
      const arr =this.listClients.filter(item => item.profession !== "Agent");

      for(var client of arr){
        this.options.push(client.nom + " " + client.prenom);
      }
      this.filteredOptions=this.options;
    })
  }
  onChange(value: string): void {
    this.filteredOptions = this.options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
}
