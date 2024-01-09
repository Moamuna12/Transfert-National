import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBeneficiaireComponent } from './search-beneficiaire.component';

describe('SearchBeneficiaireComponent', () => {
  let component: SearchBeneficiaireComponent;
  let fixture: ComponentFixture<SearchBeneficiaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBeneficiaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBeneficiaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
