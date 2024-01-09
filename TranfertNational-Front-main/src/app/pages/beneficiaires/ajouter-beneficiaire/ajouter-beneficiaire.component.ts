import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientServiceService } from 'src/app/services/client-service.service';
import { Beneficiaire } from 'src/app/model/Beneficiare.model';

@Component({
  selector: 'app-ajouter-beneficiaire',
  templateUrl: './ajouter-beneficiaire.component.html',
  styleUrls: ['./ajouter-beneficiaire.component.css']
})
export class AjouterBeneficiaireComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder,private clientService:ClientServiceService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      nom: [null, [Validators.required]],
      prenom: [null, [Validators.required]],
      telephone: [null, [Validators.required]],
      phoneNumberPrefix: ['+212']
    });
  }

  destroyModal() {
    let beneficiaire = new Beneficiaire();
    const benefValue = this.validateForm?.value;
    beneficiaire.nom = benefValue['nom'];
    beneficiaire.prenom = benefValue['prenom'];
    beneficiaire.telephone = benefValue['telephone'];
   
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.clientService.addBeneficiaire(this.validateForm.value).subscribe(
        response => {
          console.log('Beneficiaire added successfully', response);
          // Handle success, e.g., show a success message
        },
        error => {
          console.error('Error adding Beneficiaire', error);
          // Handle error, e.g., show an error message
        }
      );
    } else {
      // Your existing code to mark controls as dirty if the form is invalid
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
}
}