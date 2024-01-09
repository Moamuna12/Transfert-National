import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { ClientServiceService } from 'src/app/services/client-service.service';
import { Router } from '@angular/router';
import { PointDeVente } from 'src/app/model/PointDeVente.model';

@Component({
  selector: 'app-ajouter-pointv',
  templateUrl: './ajouter-pointv.component.html',
  styleUrls: ['./ajouter-pointv.component.css']
})
export class AjouterPointvComponent implements OnInit {
  validateForm!: FormGroup;
  PointDeVente:PointDeVente=new PointDeVente;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

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

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(private router:Router, private fb: FormBuilder, private clientService:ClientServiceService, private message:NzMessageService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      nville: [null, [Validators.required]],
      ville: [null, [Validators.required]],
      pays: [null, [Validators.required]],
      montmax: [null, [Validators.required]],
    });
  }

  ajouter(){
    const id = this.message.loading('Action in progress..', { nzDuration: 0 }).messageId;
    setTimeout(() => {
      this.message.remove(id);
    }, 2500);
    const validateValue = this.validateForm?.value;
    this.PointDeVente.numero_de_ville=validateValue['nville'];
    this.PointDeVente.pays=validateValue['pays'];
    this.PointDeVente.ville=validateValue['ville'];
    this.PointDeVente.montant_maximal=validateValue['montmax'];

  console.log(this.PointDeVente);
  this.clientService.addPoint(this.PointDeVente).subscribe((d)=>{
    setTimeout(() => {
      this.message.remove(id);
    }, 0);
      this.message.success('Point De Vente ajouté avec succès');
      this.router.navigate(['dashboard/pointvente/all'])

  },err=>{
      this.message.error("Erreur d'envoi")
  })
  }
}
