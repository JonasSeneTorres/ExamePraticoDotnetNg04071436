import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeguradoService {
  private apiUrl = `${environment.urlServico}/segurado`;

  constructor(private http: HttpClient) {}

  create(segurado: any): Observable<any> {
    segurado.seguradoId = 0;
    segurado.dataCadastro = new Date().toISOString().split('T')[0];
    segurado.dataUltimaAlteracao = null;

    return this.http.post<any>(this.apiUrl, segurado);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  update(segurado: any): Observable<any> {
    segurado.dataUltimaAlteracao = new Date().toISOString().split('T')[0];
    
    return this.http.put<any>(`${this.apiUrl}/${segurado.seguradoId}`, segurado);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
