import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherBeneficiairesComponent } from './afficher-beneficiaires.component';

describe('AfficherBeneficiairesComponent', () => {
  let component: AfficherBeneficiairesComponent;
  let fixture: ComponentFixture<AfficherBeneficiairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherBeneficiairesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherBeneficiairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
