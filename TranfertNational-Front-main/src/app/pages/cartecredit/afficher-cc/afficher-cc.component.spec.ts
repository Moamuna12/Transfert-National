import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherCcComponent } from './afficher-cc.component';

describe('AfficherCcComponent', () => {
  let component: AfficherCcComponent;
  let fixture: ComponentFixture<AfficherCcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherCcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherCcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
