import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Paginas } from '../../interfaces/paginas'
import { PaginasService } from '../../services/paginas.service'

@Component({
  selector: 'app-descripcion',
  standalone: true,
  imports: [],
  templateUrl: './descripcion.component.html',
  styleUrl: './descripcion.component.scss',
})
export class DescripcionComponent {
  id!: number
  pagina!: Paginas

  constructor(private route: ActivatedRoute, private paginaServices: PaginasService) {
    this.route.params.subscribe((params) => {
      this.id = params['id']
    })
    this.paginaServices.getPaginaByID(this.id).subscribe((pagina: any) => {
      this.pagina = pagina
    })
  }
}
