import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Certificados } from '../../interfaces/certificados'
import { CardCertComponent } from '../card-cert/card-cert.component'

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CardCertComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() institucion!: string
  @Input() certificados!: Certificados[]
  @Output() closeModal = new EventEmitter<void>()

  onClose() {
    console.log('onClose')
    this.closeModal.emit()
  }
}
