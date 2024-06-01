import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionAboutComponent } from './informacion-about.component';

describe('InformacionAboutComponent', () => {
  let component: InformacionAboutComponent;
  let fixture: ComponentFixture<InformacionAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformacionAboutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformacionAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
