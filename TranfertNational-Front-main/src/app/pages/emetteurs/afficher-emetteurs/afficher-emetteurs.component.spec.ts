import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherEmetteursComponent } from './afficher-emetteurs.component';

describe('AfficherEmetteursComponent', () => {
  let component: AfficherEmetteursComponent;
  let fixture: ComponentFixture<AfficherEmetteursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherEmetteursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherEmetteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
