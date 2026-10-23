import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { ProjectDetailComponent } from './project-detail.component';
import { projects } from '../../data/portfolio';

describe('Rutas de proyecto', () => {
  beforeEach(() => TestBed.configureTestingModule({providers: [provideRouter([{path: 'proyectos/:id', component: ProjectDetailComponent}])]}));
  it('actualiza contenido al navegar entre fichas sin reutilizar datos anteriores', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/proyectos/' + projects[0].id, ProjectDetailComponent);
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(projects[0].name);
    await harness.navigateByUrl('/proyectos/' + projects[2].id, ProjectDetailComponent);
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(projects[2].name);
  });
  it('muestra un estado recuperable para un ID inexistente', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/proyectos/no-existe', ProjectDetailComponent);
    expect(harness.routeNativeElement?.textContent).toContain('Proyecto no encontrado');
    expect(harness.routeNativeElement?.querySelector('a[href="/#trabajos"]')).not.toBeNull();
  });
});
