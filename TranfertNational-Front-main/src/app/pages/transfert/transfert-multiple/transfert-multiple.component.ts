import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Beneficiaire } from 'src/app/model/Beneficiare.model';
import { Emetteur } from 'src/app/model/Emetteur.model';
import { Transfert } from 'src/app/model/Transfert.model';
import { TransfertMultiple } from 'src/app/model/TransfertMultiple.model';
import { ClientServiceService } from 'src/app/services/client-service.service';
import { SearchClientComponent } from '../../chercherClient/search-client/search-client.component';
import { AjouterBeneficiaireComponent } from '../../beneficiaires/ajouter-beneficiaire/ajouter-beneficiaire.component';

@Component({
  selector: 'app-transfert-multiple',
  templateUrl: './transfert-multiple.component.html',
  styleUrls: ['./transfert-multiple.component.css']
})
export class TransfertMultipleComponent implements OnInit {
  dateToday=new Date();
  notifier=false;
  tplModalButtonLoading = false;
  disabled = false;
  isVisible = false;
  validateForm!: FormGroup;
  checked = true;
  inputValue?: string;
  beneficiaire:Beneficiaire=new Beneficiaire();
  filteredOptions: string[] = [];
  selectedEmetteur:Emetteur = new Emetteur();
  selectedBenef:Beneficiaire=new Beneficiaire();
  transfert:Transfert = new Transfert();
  nbrBeneficiaires : number = 0;
  options = [];
  transfertMForm!: FormGroup;
  idBeneficiaires:Array<number>=[];
  listTansferts:Transfert[] = [];
  constructor(private router: Router,private message: NzMessageService,private clientService:ClientServiceService,private fb: FormBuilder,private drawerService: NzDrawerService,private viewContainerRef: ViewContainerRef,private modal: NzModalService) { 
    this.filteredOptions = this.options;

  }
  ajouterBeneficiaire(){
    this.nbrBeneficiaires++;
  }
  ngOnInit(): void {
    this.transfertMForm = this.fb.group({
      client:[{value:this.selectedEmetteur.nom,disabled:true}, [Validators.required],],
      type: [null, [Validators.required]],
      frais: [null, [Validators.required]],
      montant: [null],
      motif:[null, [Validators.required]],
      transferts:this.fb.array([]),
      notifier:[false],
    });
    let resp = this.clientService.getBeneficiaires();
    resp.subscribe((data : Beneficiaire[])=>{
    this.options = data.map(beneficiaire => beneficiaire.nom);
    this.filteredOptions = this.options;
    },
    error => {
      console.error('Une erreur s\'est produite lors de la récupération des bénéficiaires :', error);
    })
    this.AjouterTransfert();
  }
  checkMontant = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (parseFloat(control.value) > 2000) {
      return { confirm: true, error: true };
    }
    return {};
  };
  AjouterTransfert(){
    this.nbrBeneficiaires++;
    console.log(this.nbrBeneficiaires)

      var transfertUnique = new Transfert();
      transfertUnique.date_demission=this.dateToday;
      transfertUnique.beneficiaire=this.selectedBenef;
      transfertUnique.emetteur=this.selectedEmetteur;
      transfertUnique.montant_transfert=this.transfertMForm.value['montant'];
      transfertUnique.notification=this.transfertMForm.value['notifier'];
      transfertUnique.delai_de_validite=this.dateToday;
      transfertUnique.delai_de_validite.setDate(this.transfert.delai_de_validite.getDate()+70);
      this.listTansferts.push(transfertUnique);
  }
  notifierr(){
    console.log('checked');
    this.notifier=!this.notifier;
    console.log(this.notifier)
  }
  submitForm(): void {
      const id = this.message.loading('Action in progress..', { nzDuration: 0 }).messageId;
      setTimeout(() => {
        this.message.remove(id);
      }, 2500);
      let transfertMultiple = new TransfertMultiple();
      this.listTansferts.shift();
      transfertMultiple.transferts=this.listTansferts;
      console.log(transfertMultiple);
      for(var transfert of this.listTansferts){
        console.log(transfert);
        this.clientService.emmettreTransfert(transfert).subscribe((response)=>{
          console.log(response);
          setTimeout(() => {
            this.message.remove(id);
          }, 0);
            this.startShowMessages(response.toString());
        },err=>{
            this.message.error("Erreur d'envoi")
        })
        this.router.navigate(['dashboard/transfert/all'])

      }
}
  startShowMessages(response:string): void {
        if(response == "Le transfert a été bien ajouté."){
         this.message.success(response, { nzDuration: 1000 });

        }else this.message.warning(response, { nzDuration: 2500 });
  }
  selectedBeneficiaire(value:string){
    let benefName=value['nzValue'];
     let nom = benefName.split(" ");
   this.selectedBenef=this.selectedEmetteur.beneficiaires.find(i=>i.nom===nom[0]);

  }
  onInput(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    console.log("Compare")
    this.filteredOptions = this.options.filter(option => option.indexOf(value) !== -1);
  }
  openCreateBenefComponent(): void {
    const drawerRef = this.drawerService.create<AjouterBeneficiaireComponent, { value: number | null }>({
    nzTitle: 'Ajouter un bénéficiaire',
    nzContent: AjouterBeneficiaireComponent,
    nzMaskClosable:false,
    nzWidth : "50%",
    nzContentParams: {
      value : null
    }
  });
  drawerRef.afterClose.subscribe((result) => {
    this.beneficiaire=result;
    this.selectedEmetteur.beneficiaires.push(this.beneficiaire);
    console.log(this.selectedEmetteur.beneficiaires)
    for(var benef of this.selectedEmetteur.beneficiaires){
      this.options.push(benef.nom+" "+benef.prenom);
    }
    this.clientService.updateEmetteur(this.selectedEmetteur).subscribe(response=>{
      console.log(response);
    })
  });
}
showModal(): void {
  this.isVisible = true;
}

handleOk(): void {
  console.log('Button ok clicked!');
  this.isVisible = false;
}

handleCancel(): void {
  console.log('Button cancel clicked!');
  this.isVisible = false;
}
createComponentModal(): void {
  const modal = this.modal.create({
    nzTitle: 'Ajouter le client',
    nzContent: SearchClientComponent,
    nzViewContainerRef: this.viewContainerRef,
    nzComponentParams: {
      title: 'title in component',
      subtitle: 'component sub title，will be changed after 2 sec'
    },
    nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
  });
  const instance = modal.getContentComponent();
  modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
  // Return a result when closed
  modal.afterClose.subscribe((result) =>{ 
    this.selectedEmetteur=result['result'],
    this.transfertMForm.patchValue({
      client:this.selectedEmetteur.nom + " " + this.selectedEmetteur.prenom
    })
    for(var benef of this.selectedEmetteur.beneficiaires){
      this.options.push(benef.nom + " " +benef.prenom);
    }
  }
  );

  // delay until modal instance created
  setTimeout(() => {
    instance.subtitle = 'sub title is changed';
  }, 2000);
}
}