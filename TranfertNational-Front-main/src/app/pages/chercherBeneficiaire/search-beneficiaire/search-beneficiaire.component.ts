import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Beneficiaire } from 'src/app/model/Beneficiare.model';
import { ClientServiceService } from 'src/app/services/client-service.service';

@Component({
  selector: 'app-search-beneficiaire',
  templateUrl: './search-beneficiaire.component.html',
  styleUrls: ['./search-beneficiaire.component.css']
})
export class SearchBeneficiaireComponent implements OnInit {
  @Input() title?: string;
  @Input() subtitle?: string;
  filteredOptions: String[] = [];
  options = [];
  listBeneficiaires : Beneficiaire[];
  selectedBeneficiaire:Beneficiaire;
  constructor(private clientService:ClientServiceService,private modal: NzModalRef) {
    this.filteredOptions = this.options;
  }

  destroyModal(value: string): void {
    let beneficiaireName=value['nzValue'];
    let nom = beneficiaireName.split(" ");
      this.selectedBeneficiaire= this.listBeneficiaires.find(i=>i.nom===nom[0]);
      console.log(this.selectedBeneficiaire);
    this.modal.destroy({ result: this.selectedBeneficiaire});
  }

  ngOnInit(): void {
    let resp=this.clientService.getBeneficiaires();
    resp.subscribe((data :Beneficiaire[])=>{
      this.listBeneficiaires=data;
      console.log("ss");
      console.log(data);
      const arr =this.listBeneficiaires.filter(item => item.profession !== "Agent");

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
