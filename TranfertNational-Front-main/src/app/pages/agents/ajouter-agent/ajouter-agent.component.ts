import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ToastrService } from 'ngx-toastr';
import { Agent } from 'src/app/model/Agent.model';
import { CarteDeCredit } from 'src/app/model/CarteDeCredit.model';
import { Compte } from 'src/app/model/Compte.model';
import { PieceIdentite } from 'src/app/model/PieceIdentite.model';
import { PointDeVente } from 'src/app/model/PointDeVente.model';
import { Wallet } from 'src/app/model/Wallet.model';
import { ClientServiceService } from 'src/app/services/client-service.service';
@Component({
  selector: 'app-ajouter-agent',
  templateUrl: './ajouter-agent.component.html',
  styleUrls: ['./ajouter-agent.component.css']
})
export class AjouterAgentComponent implements OnInit {
  idcomptes:Array<number>=[];
  nbrComptes:number=0;
  idCartes:Array<number>=[];
  nbrCartes:number=0;
  agent:Agent=new Agent();
  date = null;
  agentForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };
  onChange(result: Date): void {
    console.log('onChange: ', result);
    this.date=result;
  }

  submitForm(): void {
    if (this.agentForm.valid) {
      console.log('submit', this.agentForm.value);
      this.ajouter();
    } else {
      Object.values(this.agentForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.agentForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.agentForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };


  constructor(private router: Router,private clientService:ClientServiceService,private fb: FormBuilder,private message: NzMessageService) {}
  ajouterCompte(){
    this.nbrComptes++;
  }
  ajouter(){
    const id = this.message.loading('Action in progress..', { nzDuration: 0 }).messageId;
      setTimeout(() => {
        this.message.remove(id);
      }, 2500);
    const agentValue=this.agentForm?.value;
    this.agent.nom=agentValue['nom'];
    this.agent.prenom=agentValue['prenom'];
    this.agent.telephone=agentValue['telephone'];
    this.agent.sexe=agentValue['sexe'];
    this.agent.profession="Agent";
    this.agent.pays_d_adresse=agentValue['pays_d_adresse'];
    this.agent.adresselegale=agentValue['adresselegale'];
    this.agent.email=agentValue['email'];
    this.agent.ville=agentValue['ville'];
    // this.agent.type=agentValue['type'];
    // if(agentValue['numero'].length>1){
    //   console.log("piece saisie")
    //   var p=new PieceIdentite();
    //   this.agent.piece_identite=p;
    //   this.agent.piece_identite.numero=agentValue['numero'];
    //   this.agent.piece_identite.date_d_expiration=agentValue['date_d_expiration'];
    //   this.agent.piece_identite.date_de_naissance=agentValue['date_de_naissance'];
    //   this.agent.piece_identite.pays=agentValue['pays'];
    //   this.agent.piece_identite.type_piece_identite=agentValue['typePiece'];
    // }
    if(this.nbrComptes>0){
      console.log("compte ajoute")
      this.agent.comptes=[];
      const compteValue=this.agentForm.controls.comptes?.value;
        var nvCompte =new Compte();
        nvCompte.montant=agentValue['montant'];
        nvCompte.date_ouverture=this.date;
        this.agent.comptes.push(nvCompte);
    
    }
    if(this.nbrCartes>0){
      console.log("wallet ajoute")
      var w=new Wallet();
      this.agent.wallet=w;
      this.agent.wallet.cartes=[];
      const carteValue=this.agentForm.controls.cartes?.value;
      for(let carte of carteValue){
        var nvCarte =new CarteDeCredit();
        nvCarte.montant=carte['montant_carte'];
        nvCarte.date_expiration=carte['date_d_expiration_carte'];
        this.agent.wallet.cartes.push(nvCarte);
      }
    }
    if(agentValue['numeroPDV']>0){
      console.log("pdv saisi")
      var pdv=new PointDeVente();
      this.agent.pointdevente=pdv;
      this.agent.pointdevente.montant_maximal=agentValue['montantMaxPDV'];
      this.agent.pointdevente.pays=agentValue['paysPDV'];
      this.agent.pointdevente.ville=agentValue['villePDV'];
      this.agent.pointdevente.numero_de_ville=agentValue['numeroPDV'];

      
    }
    console.log(this.agent);
    this.clientService.addAgent(this.agent).subscribe((d)=>{
      setTimeout(() => {
        this.message.remove(id);
      }, 0);
        this.message.success('Agent ajouté avec succès');
        this.router.navigate(['dashboard/agent/all'])

    },err=>{
        this.message.error("Erreur d'envoi")
    })
}
  ngOnInit(): void {
    this.agentForm = this.fb.group({
      nom:[null, [Validators.required]],
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
      type:[''],
    });
  }
}
