import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherGichetbComponent } from './afficher-gichetb.component';

describe('AfficherGichetbComponent', () => {
  let component: AfficherGichetbComponent;
  let fixture: ComponentFixture<AfficherGichetbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherGichetbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherGichetbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
