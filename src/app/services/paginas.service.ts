import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaginasService {
  private urlBase = environment.apiUrl;
  private url = `${this.urlBase}/paginas`;

  constructor(private http: HttpClient) {}

  public getPaginas() {
    return this.http.get(this.url);
  }

  public getPaginaByID(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }
}
