import { Component, OnInit } from '@angular/core'
import { Certificados } from '../../interfaces/certificados'
import { CertificadosService } from '../../services/certificados.service'
import { map } from 'rxjs'
import { ModalComponent } from '../../components/modal/modal.component'
import { LoaderComponent } from '../../components/loader/loader.component'

@Component({
  selector: 'app-certificated',
  standalone: true,
  templateUrl: './certificated.component.html',
  styleUrl: './certificated.component.scss',
  imports: [ModalComponent, LoaderComponent],
})
export class CertificatedComponent implements OnInit {
  certificados: Certificados[] = []
  institucion: string = ''
  showModal = false
  loading: boolean = true

  constructor(private certificadoServices: CertificadosService) {}

  ngOnInit() {
    this.certificadoServices
      .getCertificados()
      .pipe(map((data: any): Certificados[] => data))
      .subscribe((certificados: Certificados[]) => {
        this.certificados = certificados
        setTimeout(() => {
          this.loading = false
        }, 1000)
      })
  }

  openModal(inst: string) {
    this.institucion = inst
    this.showModal = true
  }
  closeModal() {
    this.showModal = false
  }
}
