import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../components/icon/icon.component';
@Component({
  selector: 'app-not-found', standalone: true, imports: [RouterLink, IconComponent],
  template: `<main class="not-found wrap"><span class="eyebrow">404 / NOS FUIMOS UN POCO LEJOS</span><h1>{{ projectMissing ? 'Proyecto no encontrado.' : 'Esta página tomó otro camino.' }}</h1><p>El enlace puede haber cambiado. Los proyectos y toda la información siguen disponibles desde el inicio.</p><a routerLink="/" fragment="trabajos" class="button button-accent">Explorar los proyectos <app-icon name="arrow-up-right" /></a></main>`,
})
export class NotFoundComponent { @Input() projectMissing = false; }
