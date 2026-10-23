import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

describe('Navegación del portafolio', () => {
  beforeEach(() => {
    localStorage.removeItem('mm-theme');
    TestBed.configureTestingModule({imports: [AppComponent], providers: [provideRouter([])]});
  });
  it('abre el menú móvil y lo cierra con Escape', () => {
    const fixture = TestBed.createComponent(AppComponent); fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('[aria-controls="mobile-navigation"]');
    button.click(); fixture.detectChanges();
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(fixture.nativeElement.querySelector('#mobile-navigation')).not.toBeNull();
    window.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'})); fixture.detectChanges();
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(fixture.nativeElement.querySelector('#mobile-navigation')).toBeNull();
  });
  it('cambia y conserva la preferencia de tema', () => {
    const fixture = TestBed.createComponent(AppComponent); fixture.detectChanges();
    fixture.componentInstance.toggleTheme(); fixture.detectChanges();
    expect(document.documentElement.dataset['theme']).toBe('light');
    expect(localStorage.getItem('mm-theme')).toBe('light');
    expect(fixture.nativeElement.querySelector('[aria-label="Activar tema oscuro"]')).not.toBeNull();
    fixture.componentInstance.toggleTheme();
  });
});
