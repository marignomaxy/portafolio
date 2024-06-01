import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CertificadosService {
  private urlBase = environment.apiUrl;
  private url = `${this.urlBase}/certificados`;

  constructor(private http: HttpClient) {}

  public getCertificados() {
    return this.http.get(this.url);
  }

  public getCertificadoById(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }
}
