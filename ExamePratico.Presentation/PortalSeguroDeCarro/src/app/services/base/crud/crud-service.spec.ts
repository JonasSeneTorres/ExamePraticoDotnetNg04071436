import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { VeiculoService } from '../../veiculo/veiculo-service';

interface Veiculo {
  veiculoId: number;
  nome: string;
  dataCadastro?: string;
  dataUltimaAlteracao?: string | null;
}

describe('CrudService abstrato com VeiculoService', () => {
  let service: VeiculoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VeiculoService],
    });

    service = TestBed.inject(VeiculoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('create deve fazer POST e setar campos de data e id', () => {
    const veiculo: Veiculo = { veiculoId: 0, nome: 'Carro A' };

    service.create(veiculo).subscribe((res) => {
      expect(res.nome).toBe('Carro A');
      expect(res.dataCadastro).toBeDefined();
      expect(res.dataUltimaAlteracao).toBeNull();
      expect(res.veiculoId).toBe(0);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('POST');
    req.flush({ ...veiculo });
  });

  it('getAll deve fazer GET', () => {
    const lista: Veiculo[] = [{ veiculoId: 1, nome: 'Carro 1' }];

    service.getAll().subscribe((res) => {
      expect(res).toEqual(lista);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('GET');
    req.flush(lista);
  });

  it('getById deve fazer GET com id', () => {
    const veiculo: Veiculo = { veiculoId: 1, nome: 'Carro 1' };

    service.getById(1).subscribe((res) => {
      expect(res).toEqual(veiculo);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(veiculo);
  });

  it('update deve fazer PUT e atualizar dataUltimaAlteracao', () => {
    const veiculo: Veiculo = { veiculoId: 2, nome: 'Carro 2' };

    service.update(veiculo).subscribe((res) => {
      expect(res.nome).toBe('Carro 2');
      expect(res.dataUltimaAlteracao).toBeDefined();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/2`);
    expect(req.request.method).toBe('PUT');
    req.flush({ ...veiculo });
  });

  it('delete deve fazer DELETE', () => {
    service.delete(5).subscribe((res) => {
      expect(res).toBeUndefined();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/5`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('getIdName deve retornar o nome correto do campo ID', () => {
    const veiculo: Veiculo = { veiculoId: 123, nome: 'Teste' };
    const idName = (service as any).getIdName(veiculo);
    expect(idName).toBe('veiculoId');
  });

  it('getIdName deve lançar erro se não houver campo ID', () => {
    const obj = { nome: 'Teste' };
    expect(() => (service as any).getIdName(obj)).toThrowError('Não foi possível encontrar o ID da entidade');
  });
});
