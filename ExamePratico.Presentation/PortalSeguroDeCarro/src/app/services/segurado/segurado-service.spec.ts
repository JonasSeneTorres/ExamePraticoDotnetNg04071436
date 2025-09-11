import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SeguradoService } from './segurado-service';

interface Veiculo {
  veiculoId: number;
  nome: string;
  dataCadastro?: string;
  dataUltimaAlteracao?: string | null;
}

describe('CrudService abstrato com VeiculoService', () => {
  let service: SeguradoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SeguradoService],
    });

    service = TestBed.inject(SeguradoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });
});
