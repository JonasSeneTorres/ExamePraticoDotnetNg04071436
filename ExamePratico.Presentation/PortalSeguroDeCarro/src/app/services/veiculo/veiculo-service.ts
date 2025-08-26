import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
private apiUrl = `${environment.urlServico}/veiculo`;

  constructor(private http: HttpClient) {}

  create(veiculo: any): Observable<any> {
    veiculo.veiculoId = 0;
    veiculo.dataCadastro = new Date().toISOString().split('T')[0];
    veiculo.dataUltimaAlteracao = null;

    return this.http.post<any>(this.apiUrl, veiculo);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  update(veiculo: any): Observable<any> {
    veiculo.dataUltimaAlteracao = null;
    return this.http.put<any>(`${this.apiUrl}/${veiculo.veiculoId}`, veiculo);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }  
}
