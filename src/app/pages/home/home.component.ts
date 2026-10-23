import { AfterViewInit, Component, ElementRef, Inject, ViewChild, computed, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconComponent } from '../../components/icon/icon.component';
import { Education, education, portfolio, projects } from '../../data/portfolio';
import { SeoService } from '../../services/seo.service';

export function buildContactMailto(email: string, intent: string, name: string, message: string): string {
  const subject = intent === 'equipo' ? 'Oportunidad profesional · ' + name.trim() : 'Nuevo proyecto · ' + name.trim();
  const body = 'Hola Maxi,\n\n' + message.trim() + '\n\n' + name.trim();
  return 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
}

@Component({
  selector: 'app-home', standalone: true,
  imports: [RouterLink, ReactiveFormsModule, IconComponent],
  templateUrl: './home.component.html', styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
  readonly profile = portfolio.profile;
  readonly allProjects = projects;
  readonly experience = portfolio.experience;
  readonly skills = portfolio.skills;
  readonly filter = signal('Todos');
  readonly projectFilters = ['Todos', 'Productos', 'Sitios y conceptos'];
  readonly selectedIndex = signal(0);
  readonly filteredProjects = computed(() => this.filter() === 'Todos' ? projects : projects.filter(p => this.filter() === 'Productos' ? p.featured && p.category !== 'Sitio web' : p.category === 'Sitio web' || !p.featured));
  readonly activeProject = computed(() => this.filteredProjects()[this.selectedIndex()] || this.filteredProjects()[0]);
  readonly educationFilter = signal('Destacados');
  readonly educationFilters = ['Destacados', 'Todos', 'Desarrollo', 'Herramientas', 'Diseño'];
  readonly visibleEducation = computed(() => {
    const records = education.filter(e => e.category !== 'Carrera');
    const category = this.educationFilter();
    return category === 'Destacados' ? records.filter(e => e.featured) : category === 'Todos' ? records : records.filter(e => e.category === category);
  });
  readonly degree = education.find(e => e.category === 'Carrera')!;
  readonly intermediateDegree = education.find(e => e.category === 'Carrera' && e.primary === false);
  readonly selectedCertificate = signal<Education | null>(null);
  readonly intent = signal('proyecto');
  readonly contactStatus = signal('');
  readonly copyStatus = signal('');
  readonly contactForm;
  @ViewChild('certificateDialog') certificateDialog?: ElementRef<HTMLDialogElement>;
  private touchX = 0;
  private touchY = 0;
  private certificateOpener?: HTMLElement;

  constructor(private route: ActivatedRoute, formBuilder: FormBuilder, @Inject(DOCUMENT) private document: Document, seo: SeoService) {
    seo.update(this.profile.name + ' · ' + this.profile.role, this.profile.summary);
    this.contactForm = formBuilder.nonNullable.group({
      name: ['', [Validators.required, Validators.pattern(/\S/), Validators.minLength(2), Validators.maxLength(80)]],
      message: ['', [Validators.required, Validators.pattern(/\S/), Validators.minLength(15), Validators.maxLength(2000)]],
    });
  }
  ngAfterViewInit() {
    const section = this.route.snapshot.data['section'];
    if (typeof section === 'string') setTimeout(() => this.document.getElementById(section)?.scrollIntoView(), 0);
  }
  setFilter(value: string) { this.filter.set(value); this.selectedIndex.set(0); }
  selectProject(index: number) {
    const count = this.filteredProjects().length;
    this.selectedIndex.set(((index % count) + count) % count);
  }
  moveProject(step: number) { this.selectProject(this.selectedIndex() + step); }
  onCarouselKey(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') { event.preventDefault(); this.moveProject(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); this.moveProject(-1); }
    if (event.key === 'Home') { event.preventDefault(); this.selectProject(0); }
    if (event.key === 'End') { event.preventDefault(); this.selectProject(this.filteredProjects().length - 1); }
  }
  onTouchStart(event: TouchEvent) { this.touchX = event.changedTouches[0].clientX; this.touchY = event.changedTouches[0].clientY; }
  onTouchEnd(event: TouchEvent) {
    const x = event.changedTouches[0].clientX - this.touchX;
    const y = event.changedTouches[0].clientY - this.touchY;
    if (Math.abs(x) > 55 && Math.abs(x) > Math.abs(y) * 1.4) this.moveProject(x < 0 ? 1 : -1);
  }
  position(index: number) { return String(index + 1).padStart(2, '0'); }
  openCertificate(item: Education, event: Event) {
    if (!item.asset && !item.preview) return;
    this.certificateOpener = event.currentTarget as HTMLElement;
    this.selectedCertificate.set(item);
    this.certificateDialog?.nativeElement.showModal();
  }
  closeCertificate() { this.certificateDialog?.nativeElement.close(); this.selectedCertificate.set(null); this.certificateOpener?.focus(); }
  onDialogClick(event: MouseEvent) { if (event.target === this.certificateDialog?.nativeElement) this.closeCertificate(); }
  isInvalid(name: 'name' | 'message') { const field = this.contactForm.controls[name]; return field.invalid && field.touched; }
  prepareEmail() {
    if (this.contactForm.invalid) { this.contactForm.markAllAsTouched(); this.contactStatus.set('Revisá tu nombre y el mensaje antes de preparar el correo.'); return; }
    const value = this.contactForm.getRawValue();
    this.contactStatus.set('Se abrirá tu aplicación de correo con el borrador. Revisalo y envialo desde allí. Si no se abre, copiá mi email.');
    this.document.defaultView!.location.href = buildContactMailto(this.profile.email, this.intent(), value.name, value.message);
  }
  async copyEmail() {
    try { await navigator.clipboard.writeText(this.profile.email); this.copyStatus.set('Email copiado'); }
    catch { this.copyStatus.set('Podés seleccionar y copiar la dirección que aparece arriba.'); }
  }
}
