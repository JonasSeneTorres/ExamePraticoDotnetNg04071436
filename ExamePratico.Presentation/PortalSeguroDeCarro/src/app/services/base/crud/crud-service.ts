import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class CrudService<T extends Record<string, any>> {
  protected abstract apiUrl: string;

  constructor(protected http: HttpClient) {}

  protected getIdName(entity: T): string {
    const keys = Object.keys(entity);
    const idKey = keys.find((k) => k.toLowerCase().endsWith('id'));
    if (!idKey) throw new Error('Não foi possível encontrar o ID da entidade');
    return idKey;
  }

  create(entity: T): Observable<T> {
    const idName = this.getIdName(entity);
    (entity as any)[idName] = 0;
    (entity as any).dataCadastro = new Date().toISOString().split('T')[0];
    (entity as any).dataUltimaAlteracao = null;
    return this.http.post<T>(this.apiUrl, entity);
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl);
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  update(entity: T): Observable<T> {
    const idName = this.getIdName(entity);
    (entity as any).dataUltimaAlteracao = new Date().toISOString().split('T')[0];
    return this.http.put<T>(`${this.apiUrl}/${entity[idName]}`, entity);
  }

  delete(entity: T): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${entity}`);
  }
}
