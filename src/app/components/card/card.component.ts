import { Component, Input } from '@angular/core';
import { Paginas } from '../../interfaces/paginas';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() item!: Paginas;

  constructor() {}
}
