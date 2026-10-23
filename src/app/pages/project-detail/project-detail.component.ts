import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IconComponent } from '../../components/icon/icon.component';
import { portfolio, projects, Project } from '../../data/portfolio';
import { NotFoundComponent } from '../not-found/not-found.component';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-project-detail', standalone: true,
  imports: [RouterLink, IconComponent, NotFoundComponent],
  templateUrl: './project-detail.component.html', styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent {
  readonly project = signal<Project | undefined>(undefined);
  readonly nextProject = computed(() => projects[(projects.findIndex(p => p.id === this.project()?.id) + 1) % projects.length]);
  readonly profile = portfolio.profile;
  constructor(route: ActivatedRoute, seo: SeoService) {
    route.paramMap.pipe(takeUntilDestroyed()).subscribe(params => {
      const project = projects.find(p => p.id === params.get('id'));
      this.project.set(project);
      seo.update(project ? project.name + ' · ' + this.profile.name : 'Proyecto no encontrado · ' + this.profile.name,
        project?.description || 'El proyecto que buscás no está disponible en este portafolio.', project ? '/proyectos/' + project.id : '/');
    });
  }
}
