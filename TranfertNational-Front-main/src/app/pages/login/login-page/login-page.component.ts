import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Client } from 'src/app/model/Client.model';
import { ClientServiceService } from 'src/app/services/client-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  validateForm!: FormGroup;
  isLogged :boolean = false;
  isCollapsed = false;
  correct:boolean = true;
  client:Client = new Client();
  constructor(private fb: FormBuilder, private router: Router,private clientService:ClientServiceService,private message: NzMessageService) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      const id = this.message.loading('Action in progress..', { nzDuration: 0 }).messageId;
      setTimeout(() => {
        this.message.remove(id);
      }, 2500);
      this.client=this.validateForm.value;
      this.clientService.login(this.client).subscribe((response)=>{
        setTimeout(() => {
          this.message.remove(id);
        }, 0);
        if(response!=null){
          this.message.success('Login avec succes',{ nzDuration: 1000 })
          var userInf = JSON.stringify(response);
          sessionStorage.setItem("user", userInf);
          this.router.navigate(['dashboard/dashboard/home'])

        }
        if(response==null){
            this.message.error('Identifiants Incorrectes',{ nzDuration: 2500 })
        }
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
     this.router.navigate(['/transfert/all'])

    }else this.message.warning(response, { nzDuration: 2500 });
     
  
}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
    });
  }
}
