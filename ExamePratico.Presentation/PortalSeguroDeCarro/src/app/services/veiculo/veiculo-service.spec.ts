import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';

import { VeiculoMockService } from '../../services/veiculo/veiculo-service.mock';
import { VeiculoService } from './veiculo-service';

describe('VeiculoService com Mock', () => {
  let service: VeiculoService;
  let mockService: VeiculoMockService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: VeiculoService, useClass: VeiculoMockService },
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(VeiculoService);
    mockService = TestBed.inject(VeiculoService) as unknown as VeiculoMockService;
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('deve retornar lista vazia por padrão', (done) => {
      mockService.getAll().subscribe(data => {
        expect(data).toEqual([]);
        done();
      });
    });

    it('deve retornar erro quando mockService.erro = true', (done) => {
      mockService.erro = true;
      mockService.getAll().subscribe({
        next: () => {},
        error: (err) => {
          expect(err).toBeTruthy();
          done();
        }
      });
    });
  });

  describe('create', () => {
    it('deve criar um item', (done) => {
      const novo = { nome: 'Teste' };
      mockService.create(novo).subscribe(data => {
        expect(data).toEqual(novo);
        done();
      });
    });
  });

  describe('delete', () => {
    it('deve deletar sem erro', (done) => {
      mockService.delete(1).subscribe(data => {
        expect(data).toBeUndefined();
        done();
      });
    });
  });

  describe('getById', () => {
    it('deve retornar defaultEntity', (done) => {
      const entidade = { veiculoId: 1, nome: 'Teste' };
      mockService.defaultEntity = entidade;
      mockService.getById(1).subscribe(data => {
        expect(data).toEqual(entidade);
        done();
      });
    });
  });

  describe('update', () => {
    it('deve atualizar um item', (done) => {
      const entidade = { veiculoId: 1, nome: 'Atualizado' };
      mockService.update(entidade).subscribe(data => {
        expect(data).toEqual(entidade);
        done();
      });
    });
  });
});
