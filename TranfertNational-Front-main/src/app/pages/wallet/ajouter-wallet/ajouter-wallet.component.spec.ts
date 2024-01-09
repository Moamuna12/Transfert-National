import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterWalletComponent } from './ajouter-wallet.component';

describe('AjouterWalletComponent', () => {
  let component: AjouterWalletComponent;
  let fixture: ComponentFixture<AjouterWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
