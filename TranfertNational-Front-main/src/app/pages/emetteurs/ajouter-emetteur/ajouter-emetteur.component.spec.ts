import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterEmetteurComponent } from './ajouter-emetteur.component';

describe('AjouterEmetteurComponent', () => {
  let component: AjouterEmetteurComponent;
  let fixture: ComponentFixture<AjouterEmetteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterEmetteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterEmetteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
