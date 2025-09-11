import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CrudService } from '../base/crud/crud-service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SeguroService extends CrudService<any> {
  protected apiUrl = `${environment.urlServico}/seguro`;

  constructor(http: HttpClient) {
    super(http);
  }

  getMedia(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/media-por-marca`);
  }

  getRelatorio(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/relatorio`);
  }
}
