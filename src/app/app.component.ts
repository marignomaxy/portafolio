import { Component, HostListener, Inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, RouterLink, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IconComponent } from './components/icon/icon.component';
import { profile } from './data/profile.generated';

@Component({
  selector: 'app-root', standalone: true,
  imports: [RouterOutlet, RouterLink, IconComponent],
  templateUrl: './app.component.html', styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly profile = profile;
  readonly menuOpen = signal(false);
  readonly lightMode = signal(false);
  readonly year = new Date().getFullYear();
  readonly progress = signal(0);
  readonly links = [
    { label: 'Proyectos', fragment: 'trabajos' },
    { label: 'Sobre mí', fragment: 'sobre-mi' },
    { label: 'Formación', fragment: 'formacion' },
  ];
  constructor(@Inject(DOCUMENT) private document: Document, router: Router) {
    try { this.lightMode.set(localStorage.getItem('mm-theme') === 'light'); } catch { /* Almacenamiento opcional. */ }
    this.applyTheme();
    router.events.pipe(filter(e => e instanceof NavigationEnd), takeUntilDestroyed()).subscribe(() => {
      this.closeMenu(); this.onScroll();
    });
  }
  toggleTheme() {
    this.lightMode.update(value => !value); this.applyTheme();
    try { localStorage.setItem('mm-theme', this.lightMode() ? 'light' : 'dark'); } catch { /* El sitio no necesita almacenamiento. */ }
  }
  private applyTheme() { this.document.documentElement.dataset['theme'] = this.lightMode() ? 'light' : 'dark'; }
  toggleMenu() { this.menuOpen.update(value => !value); }
  closeMenu() { this.menuOpen.set(false); }
  @HostListener('window:keydown.escape') onEscape() {
    if (this.menuOpen()) {
      this.closeMenu();
      this.document.querySelector<HTMLButtonElement>('[aria-controls="mobile-navigation"]')?.focus();
    }
  }
  @HostListener('window:scroll') onScroll() {
    const page = this.document.documentElement;
    this.progress.set(page.scrollHeight > page.clientHeight ? page.scrollTop / (page.scrollHeight - page.clientHeight) : 0);
  }
}
