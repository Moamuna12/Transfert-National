import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterTransfertComponent } from './ajouter-transfert.component';

describe('AjouterTransfertComponent', () => {
  let component: AjouterTransfertComponent;
  let fixture: ComponentFixture<AjouterTransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterTransfertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
