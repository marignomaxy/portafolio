import { Component, Input } from '@angular/core';
import { Certificados } from '../../interfaces/certificados';

@Component({
  selector: 'app-card-cert',
  standalone: true,
  imports: [],
  templateUrl: './card-cert.component.html',
  styleUrl: './card-cert.component.scss',
})
export class CardCertComponent {
  @Input() certificado!: Certificados;
}
