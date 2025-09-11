import { Observable, of, throwError } from 'rxjs';

export class CrudMockService<T> {
  public defaultEntity: T | null = null;
  erro = false;
  erro$: Observable<never> = throwError(() => new Error('Falha na chamada do serviço'));

  create(entity: T): Observable<T> {
    return this.erro ? this.erro$ : of(entity);
  }

  getAll(): Observable<T[]> {
    return this.erro ? this.erro$ : of([]);
  }

  getById(_id: number): Observable<T> {
    if (this.erro) {
      return this.erro$;
    }
    
    return of(this.defaultEntity as T);
  }

  update(entity: T): Observable<T> {
    return this.erro ? this.erro$ : of(entity);
  }

  delete(_id: number): Observable<void> {
    return this.erro ? this.erro$ : of(undefined);
  }
}
