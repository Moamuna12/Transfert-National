import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherPointsvComponent } from './afficher-pointsv.component';

describe('AfficherPointsvComponent', () => {
  let component: AfficherPointsvComponent;
  let fixture: ComponentFixture<AfficherPointsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherPointsvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherPointsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
