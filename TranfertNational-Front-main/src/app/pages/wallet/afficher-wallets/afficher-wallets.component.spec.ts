import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherWalletsComponent } from './afficher-wallets.component';

describe('AfficherWalletsComponent', () => {
  let component: AfficherWalletsComponent;
  let fixture: ComponentFixture<AfficherWalletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherWalletsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherWalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
