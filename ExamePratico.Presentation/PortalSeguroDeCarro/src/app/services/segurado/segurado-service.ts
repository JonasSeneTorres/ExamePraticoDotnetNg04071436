import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CrudService } from '../base/crud/crud-service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeguradoService extends CrudService<any> {
  protected apiUrl = `${environment.urlServico}/segurado`;

  constructor(http: HttpClient) {
    super(http);
  }
}
