import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloquerTransfertComponent } from './bloquer-transfert.component';

describe('BloquerTransfertComponent', () => {
  let component: BloquerTransfertComponent;
  let fixture: ComponentFixture<BloquerTransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloquerTransfertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloquerTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
