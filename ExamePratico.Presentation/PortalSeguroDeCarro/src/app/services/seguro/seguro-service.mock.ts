import { Observable, of } from 'rxjs';

import { CrudMockService } from '../base/crud/crud-mock-service.mock';

export class SeguroMockService extends CrudMockService<any> {
  getMedia(): Observable<any[]> {
    return of([]);
  }

  getRelatorio(): Observable<any[]> {
    return of([]);
  }
}
