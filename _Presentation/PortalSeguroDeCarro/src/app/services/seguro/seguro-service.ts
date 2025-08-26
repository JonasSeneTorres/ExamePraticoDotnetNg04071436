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

  create(user: any): Observable<any> {
    user.seguradoId = 0;
    user.dataCadastro = new Date().toISOString().split('T')[0];
    user.dataUltimaAlteracao = null;

    return this.http.post<any>(this.apiUrl, user);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  update(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
