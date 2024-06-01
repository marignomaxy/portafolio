import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag-skills',
  standalone: true,
  imports: [],
  templateUrl: './tag-skills.component.html',
  styleUrl: './tag-skills.component.scss',
})
export class TagSkillsComponent {
  @Input() imagenSkill!: string;
  @Input() nombreSkill!: string;
}
