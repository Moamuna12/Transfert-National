import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterPointvComponent } from './ajouter-pointv.component';

describe('AjouterPointvComponent', () => {
  let component: AjouterPointvComponent;
  let fixture: ComponentFixture<AjouterPointvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterPointvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterPointvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
