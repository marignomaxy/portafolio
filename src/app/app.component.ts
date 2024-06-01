import { Component, Renderer2, Inject, OnInit } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { NavbarComponent } from './components/navbar/navbar.component'
import { FooterComponent } from './components/footer/footer.component'
import { LightDarkService } from './services/navbar/light-dark.service'
import { Router, NavigationEnd } from '@angular/router'
import { ViewportScroller } from '@angular/common'
import AOS from 'aos'

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
})
export class AppComponent implements OnInit {
  constructor(
    private lightDark: LightDarkService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router,
    private viewportScroller: ViewportScroller,
  ) {
    this.lightDark.isDarkTheme.subscribe((dark) => {
      if (dark) {
        this.renderer.addClass(this.document.body, 'dark')
        this.renderer.removeClass(this.document.body, 'light')
      } else {
        this.renderer.addClass(this.document.body, 'light')
        this.renderer.removeClass(this.document.body, 'dark')
      }
    })

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0])
      }
    })
  }

  ngOnInit() {
    AOS.init()
  }
}
