import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { LightDarkService } from '../../services/navbar/light-dark.service'
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  menuOpen = false
  isLightTheme!: boolean

  constructor(private lightDark: LightDarkService) {
    this.lightDark.isDarkTheme.pipe(take(1)).subscribe((isDark) => {
      this.isLightTheme = !isDark
    })
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen
  }

  cambioTema() {
    this.lightDark.isDarkTheme.pipe(take(1)).subscribe((isDark) => {
      this.lightDark.setDarkTheme(!isDark)
      this.isLightTheme = !this.isLightTheme
    })
  }
}
