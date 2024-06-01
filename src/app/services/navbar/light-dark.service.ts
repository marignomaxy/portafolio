import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
//Servicio para manejar el tema claro y oscuro
export class LightDarkService {
  private darkTheme = new BehaviorSubject<boolean>(
    window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  isDarkTheme = this.darkTheme.asObservable();

  setDarkTheme(isDarkTheme: boolean) {
    this.darkTheme.next(isDarkTheme);
  }
}
