import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagSkillsComponent } from './tag-skills.component';

describe('TagSkillsComponent', () => {
  let component: TagSkillsComponent;
  let fixture: ComponentFixture<TagSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagSkillsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
