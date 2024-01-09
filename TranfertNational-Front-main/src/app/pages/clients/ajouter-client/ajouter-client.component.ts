import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientServiceService } from 'src/app/services/client-service.service';
import { Compte } from 'src/app/model/Compte.model';
import { Client } from 'src/app/model/Client.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { CarteDeCredit } from 'src/app/model/CarteDeCredit.model';
import { Wallet } from 'src/app/model/Wallet.model';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
@Component({
  selector: 'app-ajouter-client',
  templateUrl: './ajouter-client.component.html',
  styleUrls: ['./ajouter-client.component.css']
})
export class AjouterClientComponent implements OnInit {

  idcomptes:Array<number>=[];
  nbrComptes:number=0;
  idCartes:Array<number>=[];
  nbrCartes:number=0;
  client:Client=new Client();
  validateForm!: FormGroup;
  date = null;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };
  onChange(result: Date): void {
    console.log('onChange: ', result);
    this.date=result;
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.ajouter();
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  // updateConfirmValidator(): void {
  //   /** wait for refresh value */
  //   Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  // }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  // getCaptcha(e: MouseEvent): void {
  //   e.preventDefault();
  // }
  genderChange(value: string): void {
    this.validateForm.get('note')!.setValue(value === 'male' ? 'Hi, man!' : 'Hi, lady!');
  }
  constructor(private router: Router,private message: NzMessageService,private clientService:ClientServiceService,private fb: FormBuilder) {}

  ajouterCompte(){
    this.nbrComptes++;
  }
  ajouter(){
    const id = this.message.loading('Action in progress..', { nzDuration: 0 }).messageId;
      setTimeout(() => {
        this.message.remove(id);
      }, 2500);

    const ClientValue=this.validateForm?.value;
      this.client.nom=ClientValue['nom'];
      this.client.prenom=ClientValue['prenom'];
      this.client.telephone=ClientValue['telephone'];
      this.client.sexe=ClientValue['sexe'];
      this.client.profession="Client";
      this.client.pays_d_adresse=ClientValue['pays_d_adresse'];
      this.client.adresselegale=ClientValue['adresselegale'];
      this.client.email=ClientValue['email'];
      this.client.ville=ClientValue['ville'];
      this.client.type=ClientValue['type'];
      // if( EmetteurValue['numero'].length>1){
      //   console.log("piece saisie")
      //   var p=new PieceIdentite();
      //   this.emetteur.piece_identite=p;
      //   this.emetteur.piece_identite.numero=EmetteurValue['numero'];
      //   this.emetteur.piece_identite.date_d_expiration=EmetteurValue['date_d_expiration'];
      //   this.emetteur.piece_identite.date_de_naissance=EmetteurValue['date_de_naissance'];
      //   this.emetteur.piece_identite.pays=EmetteurValue['pays'];
      //   this.emetteur.piece_identite.type_piece_identite=EmetteurValue['typePiece'];
      // }
      if(this.nbrComptes>0){
        console.log("compte saisi")
        this.client.comptes=[];
          var nvCompte =new Compte();
          nvCompte.montant=ClientValue['montant'];
          nvCompte.type=ClientValue['typeCompte'];
          nvCompte.date_ouverture=this.date;
          this.client.comptes.push(nvCompte);

      }
      if(this.nbrCartes>0){
        console.log("wallet saisi")
        var w=new Wallet();
        this.client.wallet=w;
        this.client.wallet.cartes=[];
        const carteValue=this.validateForm.controls.cartes?.value;
        for(let carte of carteValue){
          var nvCarte =new CarteDeCredit();
          nvCarte.montant=carte['montant_carte'];
          nvCarte.date_expiration=carte['date_d_expiration_carte'];
          this.client.wallet.cartes.push(nvCarte);
        }
      }
      // if(this.nbrBeneficiaires>0){
      //   this.emetteur.beneficiaires=[];
      //   const beneficiaireValue=this.emetteurForm.controls.beneficiaires?.value;
      //   console.log(beneficiaireValue);
      //   for(let i=0;i<beneficiaireValue.length;i++){
      //     let index=beneficiaireValue[i]['idBeneficiaire'];
      //     console.log(index);
      //     this.emetteur.beneficiaires.push(this.beneficiaires[index]);
      //   }

      // }
      console.log(this.client.comptes);

      this.clientService.addClient(this.client).subscribe((d)=>{
        setTimeout(() => {
          this.message.remove(id);
        }, 0);
          this.message.success('Client ajouté avec succès');
          this.router.navigate(['dashboard/client/all'])

      },err=>{
          this.message.error("Erreur d'envoi")
      })

    // this.thoast.success("agent Ajouté","Succes")
}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      nom:[null, [Validators.required]],
      typeCompte:[''],
      prenom:[null, [Validators.required]],
      sexe:[null, [Validators.required]],
      pays_d_adresse:[null, [Validators.required]],
      adresselegale:[null, [Validators.required]],
      ville:[null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      phoneNumberPrefix: ['+212'],
      telephone: [null, [Validators.required]],
      montant:[''],
      date_ouverture:[''],
      type:[null, [Validators.required]],
      // email: [null, [Validators.email, Validators.required]],
      // password: [null, [Validators.required]],
      // checkPassword: [null, [Validators.required, this.confirmationValidator]],
      // nickname: [null, [Validators.required]],
      // phoneNumberPrefix: ['+212'],
      // phoneNumber: [null, [Validators.required]],
      // website: [null, [Validators.required]],
      // captcha: [null, [Validators.required]],
      // agree: [false]
    });
  }
}