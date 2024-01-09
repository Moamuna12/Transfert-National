import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterCcComponent } from './ajouter-cc.component';

describe('AjouterCcComponent', () => {
  let component: AjouterCcComponent;
  let fixture: ComponentFixture<AjouterCcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterCcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterCcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
