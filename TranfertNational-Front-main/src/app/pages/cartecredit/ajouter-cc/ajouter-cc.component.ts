import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { CarteDeCredit } from 'src/app/model/CarteDeCredit.model';
import { ClientServiceService } from 'src/app/services/client-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-cc',
  templateUrl: './ajouter-cc.component.html',
  styleUrls: ['./ajouter-cc.component.css']
})
export class AjouterCcComponent implements OnInit {
  ccForm!: FormGroup;
  carteCredit:CarteDeCredit=new CarteDeCredit();
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  submitForm(): void {
    if (this.ccForm.valid) {
      console.log('submit', this.ccForm.value);
      this.ajouter();
    } else {
      Object.values(this.ccForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }


  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.ccForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.ccForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(private router: Router,private fb: FormBuilder,private clientService:ClientServiceService,private message: NzMessageService) {}

  ngOnInit(): void {
    this.ccForm = this.fb.group({
      idWallet: [null, [Validators.required]],
      montant:[''],
      datePicker:[''],
    });
  }

  ajouter() {
      const id = this.message.loading('Action in progress..', { nzDuration: 0 }).messageId;
      setTimeout(() => {
        this.message.remove(id);
      }, 2500);
      const ccValue = this.ccForm?.value;
      this.carteCredit.wallet.id=ccValue['idWallet'];
      this.carteCredit.date_expiration=ccValue['datePicker'];
      this.carteCredit.montant=ccValue['montant'];

    console.log(this.carteCredit);
    this.clientService.addCarte(this.carteCredit).subscribe((d)=>{
      setTimeout(() => {
        this.message.remove(id);
      }, 0);
        this.message.success('Carte Credit ajoutée avec succès');
        this.router.navigate(['dashboard/cartecredit/all'])

    },err=>{
        this.message.error("Erreur d'envoi")
    })
  }
}
