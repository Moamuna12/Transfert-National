import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CarteDeCredit } from 'src/app/model/CarteDeCredit.model';
import { Compte } from 'src/app/model/Compte.model';
import { Emetteur } from 'src/app/model/Emetteur.model';
import { PieceIdentite } from 'src/app/model/PieceIdentite.model';
import { PointDeVente } from 'src/app/model/PointDeVente.model';
import { Wallet } from 'src/app/model/Wallet.model';
import { ClientServiceService } from 'src/app/services/client-service.service';

@Component({
  selector: 'app-ajouter-emetteur',
  templateUrl: './ajouter-emetteur.component.html',
  styleUrls: ['./ajouter-emetteur.component.css']
})
export class AjouterEmetteurComponent implements OnInit {
  idcomptes:Array<number>=[];
  nbrComptes:number=0;
  idCartes:Array<number>=[];
  nbrCartes:number=0;
  emetteur:Emetteur=new Emetteur();
  emetteurForm!: FormGroup;
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
    if (this.emetteurForm.valid) {
      console.log('submit', this.emetteurForm.value);
      this.ajouter();
    } else {
      Object.values(this.emetteurForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.emetteurForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };


  constructor(private router: Router,private message: NzMessageService,private clientService:ClientServiceService,private fb: FormBuilder) {}
  ajouterCompte(){
    this.nbrComptes++;
  }
  ajouter(){
    const id = this.message.loading('Action in progress..', { nzDuration: 0 }).messageId;
      setTimeout(() => {
        this.message.remove(id);
      }, 2500);

    const EmetteurValue=this.emetteurForm?.value;
      this.emetteur.nom=EmetteurValue['nom'];
      this.emetteur.prenom=EmetteurValue['prenom'];
      this.emetteur.telephone=EmetteurValue['telephone'];
      this.emetteur.sexe=EmetteurValue['sexe'];
      this.emetteur.profession="Emetteur";
      this.emetteur.pays_d_adresse=EmetteurValue['pays_d_adresse'];
      this.emetteur.adresselegale=EmetteurValue['adresselegale'];
      this.emetteur.email=EmetteurValue['email'];
      this.emetteur.ville=EmetteurValue['ville'];
      this.emetteur.type=EmetteurValue['type'];
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
        this.emetteur.comptes=[];       
          var nvCompte =new Compte();
          nvCompte.montant=EmetteurValue['montant'];
          nvCompte.type=EmetteurValue['typeCompte'];
          nvCompte.date_ouverture=this.date;
          this.emetteur.comptes.push(nvCompte);
        
      }
      if(this.nbrCartes>0){
        console.log("wallet saisi")
        var w=new Wallet();
        this.emetteur.wallet=w;
        this.emetteur.wallet.cartes=[];
        const carteValue=this.emetteurForm.controls.cartes?.value;
        for(let carte of carteValue){
          var nvCarte =new CarteDeCredit();
          nvCarte.montant=carte['montant_carte'];
          nvCarte.date_expiration=carte['date_d_expiration_carte'];
          this.emetteur.wallet.cartes.push(nvCarte);
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
      console.log(this.emetteur.comptes);
      
      this.clientService.addEmetteur(this.emetteur).subscribe((d)=>{
        setTimeout(() => {
          this.message.remove(id);
        }, 0);
          this.message.success('Emetteur ajouté avec succès');
          this.router.navigate(['dashboard/emetteur/all'])

      },err=>{
          this.message.error("Erreur d'envoi")
      })
      
    // this.thoast.success("agent Ajouté","Succes")
}
  ngOnInit(): void {
    this.emetteurForm = this.fb.group({
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
    });
  }
}
