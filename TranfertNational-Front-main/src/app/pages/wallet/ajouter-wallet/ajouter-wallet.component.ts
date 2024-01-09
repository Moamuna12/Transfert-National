import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { ClientServiceService } from 'src/app/services/client-service.service';
import { Router } from '@angular/router';
import { Wallet } from 'src/app/model/Wallet.model';

@Component({
  selector: 'app-ajouter-wallet',
  templateUrl: './ajouter-wallet.component.html',
  styleUrls: ['./ajouter-wallet.component.css']
})
export class AjouterWalletComponent implements OnInit {
    validateForm!: FormGroup;
    Wallet:Wallet=new Wallet;
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
        idWallet: [null, [Validators.required]]
      });
    }
  
    ajouter(){
      const id = this.message.loading('Action in progress..', { nzDuration: 0 }).messageId;
      setTimeout(() => {
        this.message.remove(id);
      }, 2500);
      const validateValue = this.validateForm?.value;
      this.Wallet.id=validateValue['idWallet'];
  
    console.log(this.Wallet);
    this.clientService.addWallet(this.Wallet).subscribe((d)=>{
      setTimeout(() => {
        this.message.remove(id);
      }, 0);
        this.message.success('Point De Vente ajouté avec succès');
        this.router.navigate(['dashboard/wallet/all'])
  
    },err=>{
        this.message.error("Erreur d'envoi")
    })
    }

}
