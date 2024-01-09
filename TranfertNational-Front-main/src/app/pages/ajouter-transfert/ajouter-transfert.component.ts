import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AjouterBeneficiaireComponent } from '../beneficiaires/ajouter-beneficiaire/ajouter-beneficiaire.component';
import { SearchClientComponent } from '../chercherClient/search-client/search-client.component';

@Component({
  selector: 'app-ajouter-transfert',
  templateUrl: './ajouter-transfert.component.html',
  styleUrls: ['./ajouter-transfert.component.css']
})
export class AjouterTransfertComponent implements OnInit {
  tplModalButtonLoading = false;
  disabled = false;
  isVisible = false;
  validateForm!: FormGroup;
  checked = true;
  inputValue?: string;
  filteredOptions: string[] = [];
  options = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
  constructor(private fb: FormBuilder,private drawerService: NzDrawerService,private viewContainerRef: ViewContainerRef,private modal: NzModalService) { 
    this.filteredOptions = this.options;

  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      type: [null, [Validators.required]],
      montant: [null, [Validators.required,this.checkMontant]],
      typeFrais: [null, [Validators.required]],
      otp:[null, [Validators.required]]
    });
  }
  checkMontant = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (parseFloat(control.value) > 2000) {
      return { confirm: true, error: true };
    }
    return {};
  };
  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  genderChange(value: string): void {
    this.validateForm.get('note')!.setValue(value === 'male' ? 'Hi, man!' : 'Hi, lady!');
  }
  onChange(value: string): void {
    this.filteredOptions = this.options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
  openCreateBenefComponent(): void {
    this.drawerService.create<AjouterBeneficiaireComponent, { value: number | null }, string>({
    nzTitle: 'Ajouter un bénéficiaire',
    nzContent: AjouterBeneficiaireComponent,
    nzMaskClosable:false,
    nzWidth : "50%",
    nzContentParams: {
      value : null
    }
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
    nzTitle: 'Modal Title',
    nzContent: SearchClientComponent,
    nzViewContainerRef: this.viewContainerRef,
    nzComponentParams: {
      title: 'title in component',
      subtitle: 'component sub title，will be changed after 2 sec'
    },
    nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
    nzFooter: [
      {
        label: 'change component title from outside',
        onClick: componentInstance => {
          componentInstance!.title = 'title in inner component is changed';
        }
      }
    ]
  });
  const instance = modal.getContentComponent();
  modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
  // Return a result when closed
  modal.afterClose.subscribe(result => console.log('[afterClose] The result is:', result));

  // delay until modal instance created
  setTimeout(() => {
    instance.subtitle = 'sub title is changed';
  }, 2000);
}
}
