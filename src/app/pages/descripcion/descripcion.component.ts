import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Paginas } from '../../interfaces/paginas'
import { PaginasService } from '../../services/paginas.service'
import { LoaderComponent } from '../../components/loader/loader.component'

@Component({
  selector: 'app-descripcion',
  standalone: true,
  templateUrl: './descripcion.component.html',
  styleUrl: './descripcion.component.scss',
  imports: [LoaderComponent],
})
export class DescripcionComponent {
  id!: number
  pagina!: Paginas
  loading: boolean = true

  constructor(private route: ActivatedRoute, private paginaServices: PaginasService) {
    this.route.params.subscribe((params) => {
      this.id = params['id']
    })
    this.paginaServices.getPaginaByID(this.id).subscribe((pagina: any) => {
      this.pagina = pagina
      setTimeout(() => {
        this.loading = false
      }, 1000)
    })
  }
}
