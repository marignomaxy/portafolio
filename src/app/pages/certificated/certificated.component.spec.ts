import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatedComponent } from './certificated.component';

describe('CertificatedComponent', () => {
  let component: CertificatedComponent;
  let fixture: ComponentFixture<CertificatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificatedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CertificatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
