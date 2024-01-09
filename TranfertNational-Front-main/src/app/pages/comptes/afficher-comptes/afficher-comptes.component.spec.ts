import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherComptesComponent } from './afficher-comptes.component';

describe('AfficherComptesComponent', () => {
  let component: AfficherComptesComponent;
  let fixture: ComponentFixture<AfficherComptesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherComptesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherComptesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
