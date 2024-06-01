import { Component, OnInit } from '@angular/core'
import { InformacionAboutComponent } from '../../components/informacion-about/informacion-about.component'
import { TagSkillsComponent } from '../../components/tag-skills/tag-skills.component'
import { CardComponent } from '../../components/card/card.component'
import { RouterModule } from '@angular/router'
import { BannerContactoComponent } from '../../components/banner-contacto/banner-contacto.component'
import { PaginasService } from '../../services/paginas.service'
import { map } from 'rxjs/operators'
import { Paginas } from '../../interfaces/paginas'
import { LoaderComponent } from '../../components/loader/loader.component'

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    InformacionAboutComponent,
    TagSkillsComponent,
    CardComponent,
    RouterModule,
    BannerContactoComponent,
    LoaderComponent,
  ],
})
export class HomeComponent implements OnInit {
  paginas: Paginas[] = []
  loading: boolean = true

  constructor(private paginaServices: PaginasService) {}

  ngOnInit() {
    this.paginaServices
      .getPaginas()
      .pipe(map((data: any): Paginas[] => data))
      .subscribe((paginas: Paginas[]) => {
        this.paginas = paginas
        setTimeout(() => {
          this.loading = false
        }, 1000)
      })
  }
}
