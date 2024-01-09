import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherTransfertsComponent } from './afficher-transferts.component';

describe('AfficherTransfertsComponent', () => {
  let component: AfficherTransfertsComponent;
  let fixture: ComponentFixture<AfficherTransfertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherTransfertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherTransfertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
