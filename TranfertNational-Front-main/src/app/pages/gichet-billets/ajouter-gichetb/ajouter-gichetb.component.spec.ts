import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterGichetbComponent } from './ajouter-gichetb.component';

describe('AjouterGichetbComponent', () => {
  let component: AjouterGichetbComponent;
  let fixture: ComponentFixture<AjouterGichetbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterGichetbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterGichetbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
