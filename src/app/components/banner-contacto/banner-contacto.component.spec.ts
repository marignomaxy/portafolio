import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerContactoComponent } from './banner-contacto.component';

describe('BannerContactoComponent', () => {
  let component: BannerContactoComponent;
  let fixture: ComponentFixture<BannerContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerContactoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BannerContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
