import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment';
import { SeguroService } from './seguro-service';

describe('SeguroService (CrudService abstrato)', () => {
  let service: SeguroService;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.urlServico}/seguro`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SeguroService],
    });

    service = TestBed.inject(SeguroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('deve chamar getMedia e retornar dados', () => {
    const media = [{ marca: 'VW', media: 1000 }];
    service.getMedia().subscribe((res) => {
      expect(res).toEqual(media);
    });

    const req = httpMock.expectOne(`${apiUrl}/media-por-marca`);
    expect(req.request.method).toBe('GET');
    req.flush(media);
  });

  it('deve chamar getRelatorio e retornar dados', () => {
    const relatorio = [{ marca: 'VW', total: 5 }];
    service.getRelatorio().subscribe((res) => {
      expect(res).toEqual(relatorio);
    });

    const req = httpMock.expectOne(`${apiUrl}/relatorio`);
    expect(req.request.method).toBe('GET');
    req.flush(relatorio);
  });
});
