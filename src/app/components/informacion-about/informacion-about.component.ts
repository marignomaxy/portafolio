import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-informacion-about',
  standalone: true,
  imports: [],
  templateUrl: './informacion-about.component.html',
  styleUrl: './informacion-about.component.scss',
})
export class InformacionAboutComponent {
  @Input() numberInformacion!: string;
  @Input() textoComplementario!: string;
}
