import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatTooltipModule } from '@angular/material/tooltip'
import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [ReactiveFormsModule, MatTooltipModule, CommonModule],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss',
})
export class ContactMeComponent implements OnInit {
  private urlBase = environment.apiUrl
  private url = `${this.urlBase}/enviarMail`
  formularioContacto!: FormGroup

  constructor(private formbuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.formularioContacto = this.formbuilder.group({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
      proyecto: new FormControl(''),
      asunto: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mensaje: new FormControl('', [Validators.required, Validators.minLength(10)]),
    })
  }

  onSubmit() {
    this.http.post(this.url, this.formularioContacto.value).subscribe((response) => {
      console.log('Correo enviado', response)
    })
  }
}
