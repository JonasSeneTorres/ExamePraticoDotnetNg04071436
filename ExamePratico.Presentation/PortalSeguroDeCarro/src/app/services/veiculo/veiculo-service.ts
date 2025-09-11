import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CrudService } from '../base/crud/crud-service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService extends CrudService<any> {
  protected apiUrl = `${environment.urlServico}/veiculo`;

  constructor(http: HttpClient) {
    super(http);
  }
}
