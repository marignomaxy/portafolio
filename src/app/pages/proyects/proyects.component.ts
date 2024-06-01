import { Component, OnInit } from '@angular/core'
import { Paginas } from '../../interfaces/paginas'
import { PaginasService } from '../../services/paginas.service'
import { map } from 'rxjs'
import { CardComponent } from '../../components/card/card.component'
import { LoaderComponent } from '../../components/loader/loader.component'

@Component({
  selector: 'app-proyects',
  standalone: true,
  templateUrl: './proyects.component.html',
  styleUrl: './proyects.component.scss',
  imports: [CardComponent, LoaderComponent],
})
export class ProyectsComponent implements OnInit {
  paginas: Paginas[] = []
  loading: boolean = true
  constructor(private paginaServices: PaginasService) {}

  ngOnInit() {
    this.paginaServices
      .getPaginas()
      .pipe(
        map((data: any): Paginas[] =>
          data.sort((a: Paginas, b: Paginas) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()),
        ),
      )
      .subscribe((paginas: Paginas[]) => {
        this.paginas = paginas
        setTimeout(() => {
          this.loading = false
        }, 1000)
      })
  }
}
