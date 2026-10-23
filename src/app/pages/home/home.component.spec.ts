import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent, buildContactMailto } from './home.component';
import { projects, portfolio } from '../../data/portfolio';

describe('Experiencia local del portafolio', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HomeComponent], providers: [provideRouter([])]}));
  it('muestra el contenido sin HttpClient ni servicios remotos', () => {
    const fixture = TestBed.createComponent(HomeComponent); fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Ideas claras.');
    expect(fixture.nativeElement.querySelector('.project-story h3').textContent).toBe(projects[0].name);
    expect(fixture.nativeElement.textContent).toContain(portfolio.experience[0].company);
  });
  it('permite recorrer los cuatro proyectos con controles y teclado', () => {
    const fixture = TestBed.createComponent(HomeComponent); fixture.detectChanges();
    fixture.nativeElement.querySelector('[aria-label="Proyecto siguiente"]').click(); fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.project-story h3').textContent).toBe(projects[1].name);
    fixture.nativeElement.querySelector('.project-carousel').dispatchEvent(new KeyboardEvent('keydown', {key: 'End', bubbles: true})); fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.project-story h3').textContent).toBe(projects[3].name);
    expect(fixture.nativeElement.querySelector('.concept-note')).not.toBeNull();
    fixture.nativeElement.querySelector('[aria-label="Proyecto siguiente"]').click(); fixture.detectChanges();
    expect(fixture.componentInstance.selectedIndex()).toBe(0);
  });
  it('reinicia la posición al filtrar y mantiene la ficha coherente', () => {
    const fixture = TestBed.createComponent(HomeComponent); fixture.detectChanges();
    fixture.componentInstance.selectProject(3);
    fixture.componentInstance.setFilter('Productos'); fixture.detectChanges();
    expect(fixture.componentInstance.selectedIndex()).toBe(0);
    expect(fixture.componentInstance.filteredProjects().length).toBe(2);
    expect(fixture.nativeElement.querySelector('.project-visual img').getAttribute('src')).toBe(projects[0].image);
  });
  it('filtra formación y excluye cursos de otras categorías', () => {
    const fixture = TestBed.createComponent(HomeComponent); fixture.detectChanges();
    const platzi = portfolio.education.filter(item => item.issuer === 'Platzi');
    expect(platzi.length).toBe(5);
    expect(platzi.every(item => fixture.componentInstance.visibleEducation().some(visible => visible.id === item.id))).toBeTrue();
    fixture.componentInstance.educationFilter.set('Diseño'); fixture.detectChanges();
    expect(fixture.componentInstance.visibleEducation().length).toBeGreaterThan(0);
    expect(fixture.componentInstance.visibleEducation().every(item => item.category === 'Diseño')).toBeTrue();
  });
  it('abre la credencial local y devuelve el foco al cerrarla', () => {
    const fixture = TestBed.createComponent(HomeComponent); fixture.detectChanges();
    const opener: HTMLButtonElement = fixture.nativeElement.querySelector('[aria-label^="Ver certificado de"]');
    opener.click(); fixture.detectChanges();
    const dialog: HTMLDialogElement = fixture.nativeElement.querySelector('dialog');
    expect(dialog.open).toBeTrue();
    expect(dialog.querySelector('img')?.getAttribute('src')).toMatch(/^assets\/certificates\//);
    dialog.dispatchEvent(new Event('cancel')); fixture.detectChanges();
    expect(dialog.open).toBeFalse();
    expect(document.activeElement).toBe(opener);
  });
  it('rechaza un mensaje vacío sin abrir correo ni simular un envío', () => {
    const fixture = TestBed.createComponent(HomeComponent); fixture.detectChanges();
    fixture.nativeElement.querySelector('.contact-form').dispatchEvent(new Event('submit', {bubbles: true, cancelable: true})); fixture.detectChanges();
    expect(fixture.componentInstance.contactForm.controls.name.touched).toBeTrue();
    expect(fixture.nativeElement.querySelector('#name-error')).not.toBeNull();
    expect(fixture.componentInstance.contactStatus()).toContain('Revisá');
  });
  it('codifica el borrador sin perder caracteres ni crear parámetros adicionales', () => {
    const mailto = buildContactMailto('test@example.com', 'equipo', 'Ana & Luis', 'Propuesta con +, ñ, ? y &.\nSegunda línea.');
    const url = new URL(mailto);
    expect(url.searchParams.get('subject')).toBe('Oportunidad profesional · Ana & Luis');
    expect(url.searchParams.get('body')).toContain('Propuesta con +, ñ, ? y &.\nSegunda línea.');
    let parameterCount = 0;
    url.searchParams.forEach(() => parameterCount++);
    expect(parameterCount).toBe(2);
  });
});
