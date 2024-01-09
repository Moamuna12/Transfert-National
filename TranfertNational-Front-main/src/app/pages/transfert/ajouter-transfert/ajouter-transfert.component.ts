import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Beneficiaire } from 'src/app/model/Beneficiare.model';
import { concatMap } from 'rxjs/operators';
import { Client } from 'src/app/model/Client.model';
import { Emetteur } from 'src/app/model/Emetteur.model';
import { Transfert } from 'src/app/model/Transfert.model';
import { ClientServiceService } from 'src/app/services/client-service.service';
import { SearchClientComponent } from '../../chercherClient/search-client/search-client.component';
import { Router } from '@angular/router';
import { AjouterBeneficiaireComponent } from '../../beneficiaires/ajouter-beneficiaire/ajouter-beneficiaire.component';
@Component({
  selector: 'app-ajouter-transfert',
  templateUrl: './ajouter-transfert.component.html',
  styleUrls: ['./ajouter-transfert.component.css']
})
export class AjouterTransfertComponent implements OnInit {
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
  options = [];
  constructor(private router: Router,private message: NzMessageService,private clientService:ClientServiceService,private fb: FormBuilder,private drawerService: NzDrawerService,private viewContainerRef: ViewContainerRef,private modal: NzModalService) { 
    this.filteredOptions = this.options;

  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      client:[{value:this.selectedEmetteur.nom,disabled:true}, [Validators.required],],
      type: [null, [Validators.required]],
      montant: [null, [Validators.required,this.checkMontant]],
      frais: [null, [Validators.required]],
      motif:[null, [Validators.required]],
      notifier:[false],
      // otp:[null, [Validators.required]]
    });
    let resp = this.clientService.getBeneficiaires();
    resp.subscribe((data : Beneficiaire[])=>{
    this.options = data.map(beneficiaire => beneficiaire.nom);
    this.filteredOptions = this.options;
    },
    error => {
      console.error('Une erreur s\'est produite lors de la récupération des bénéficiaires :', error);
    })
  }
  checkMontant = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (parseFloat(control.value) > 2000) {
      return { confirm: true, error: true };
    }
    return {};
  };
  
  notifierr(){
    console.log('checked');
    this.notifier=!this.notifier;
    console.log(this.notifier)
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      const id = this.message.loading('Action in progress..', { nzDuration: 0 }).messageId;
      setTimeout(() => {
        this.message.remove(id);
      }, 2500);

      this.transfert=this.validateForm.value;
      this.transfert.date_demission=this.dateToday;
      this.transfert.beneficiaire=this.selectedBenef;
      this.transfert.emetteur=this.selectedEmetteur;
      this.transfert.montant_transfert=this.validateForm.value['montant'];
      this.transfert.notification=this.validateForm.value['notifier'];
      this.transfert.delai_de_validite=this.dateToday;
      this.transfert.delai_de_validite.setDate(this.transfert.delai_de_validite.getDate()+70);
      console.log(this.transfert);
      this.clientService.emmettreTransfert(this.transfert).subscribe((response)=>{
        setTimeout(() => {
          this.message.remove(id);
        }, 0);
          this.startShowMessages(response);
      },err=>{
          this.message.error("Erreur d'envoi")
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  startShowMessages(response:string): void {
    
        if(response == "Le transfert a été bien ajouté."){
         this.message.success(response, { nzDuration: 1000 });
         this.router.navigate(['dashboard/transfert/all'])

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
    this.validateForm.patchValue({
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