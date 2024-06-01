import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCertComponent } from './card-cert.component';

describe('CardCertComponent', () => {
  let component: CardCertComponent;
  let fixture: ComponentFixture<CardCertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardCertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
