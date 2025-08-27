import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SeguroService {
  private apiUrl = `${environment.urlServico}/seguro`;

  constructor(private http: HttpClient) {}

  create(seguro: any): Observable<any> {
    seguro.seguradoId = 0;
    seguro.dataCadastro = new Date().toISOString().split('T')[0];
    seguro.dataUltimaAlteracao = null;

    return this.http.post<any>(this.apiUrl, seguro);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  update(seguro: any): Observable<any> {
    seguro.dataUltimaAlteracao = null;
    return this.http.put<any>(`${this.apiUrl}/${seguro.seguroId}`, seguro);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getMedia(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/media-por-marca`);
  }

  getRelatorio(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/relatorio`);
  }
}
