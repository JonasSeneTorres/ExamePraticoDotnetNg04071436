import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { SeguradoMockService } from '../../../services/segurado/segurado-service.mock';
import { SeguradoService } from '../../../services/segurado/segurado-service';
import { SeguroDetalhe } from '../../seguro/seguro-detalhe/seguro-detalhe';
import { SeguroMockService } from '../../../services/seguro/seguro-service.mock';
import { SeguroService } from '../../../services/seguro/seguro-service';
import { VeiculoMockService } from '../../../services/veiculo/veiculo-service.mock';
import { VeiculoService } from '../../../services/veiculo/veiculo-service';

describe('SeguroDetalhe', () => {
  let component: SeguroDetalhe;
  let fixture: ComponentFixture<SeguroDetalhe>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteSpy: any;
  let seguroService: SeguroMockService;
  let seguradoService: SeguradoMockService;
  let veiculoService: VeiculoMockService;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteSpy = { paramMap: of({ get: (key: string) => null }) };

    await TestBed.configureTestingModule({
      imports: [SeguroDetalhe],
      providers: [
        { provide: SeguroService, useClass: SeguroMockService },
        { provide: SeguradoService, useClass: SeguradoMockService },
        { provide: VeiculoService, useClass: VeiculoMockService },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SeguroDetalhe);
    component = fixture.componentInstance;

    seguroService = TestBed.inject(SeguroService) as unknown as SeguroMockService;
    seguradoService = TestBed.inject(SeguradoService) as unknown as SeguradoMockService;
    veiculoService = TestBed.inject(VeiculoService) as unknown as VeiculoMockService;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('deve inicializar a tela e carregar veiculos e segurados', fakeAsync(() => {
      const veiculosMock = [{ veiculoId: 1 }];
      const seguradosMock = [{ seguradoId: 1 }];

      spyOn(veiculoService, 'getAll').and.returnValue(of(veiculosMock));
      spyOn(seguradoService, 'getAll').and.returnValue(of(seguradosMock));

      component.ngOnInit();
      tick();

      expect(component.listaVeiculos).toEqual(veiculosMock);
      expect(component.listaSegurados).toEqual(seguradosMock);
    }));

    it('deve navegar para /erro se forkJoin falhar', fakeAsync(() => {
      spyOn(veiculoService, 'getAll').and.returnValue(throwError(() => new Error('Erro')));
      spyOn(seguradoService, 'getAll').and.returnValue(of([]));

      component.ngOnInit();
      tick();

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/erro']);
    }));
  });

  describe('onSubmit', () => {
    it('deve chamar adicionar se acao for Novo', fakeAsync(() => {
      component.acao = 'Novo';
      component.form.setValue({
        seguroId: 0,
        seguradoId: '',
        veiculoId: '',
        lucro: 0,
        margemSeguranca: 0,
        dataCadastro: '',
        dataUltimaAlteracao: '',
      });

      spyOn(component as any, 'adicionar').and.callThrough();

      component.onSubmit();
      tick();

      expect((component as any).adicionar).toHaveBeenCalled();
    }));

    it('deve chamar editar se acao não for Novo', fakeAsync(() => {
      component.acao = 'Editar';
      component.form.setValue({
        seguroId: 0,
        seguradoId: '',
        veiculoId: '',
        lucro: 0,
        margemSeguranca: 0,
        dataCadastro: '',
        dataUltimaAlteracao: '',
      });

      spyOn(component as any, 'editar').and.callThrough();

      component.onSubmit();
      tick();

      expect((component as any).editar).toHaveBeenCalled();
    }));
  });

  describe('adicionar', () => {
    it('deve navegar para /seguro ao adicionar com sucesso', fakeAsync(() => {
      spyOn(seguroService, 'create').and.returnValue(of({}));
      (component as any).adicionar();
      tick();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/seguro']);
    }));

    it('deve navegar para /erro ao falhar adicionar', fakeAsync(() => {
      spyOn(seguroService, 'create').and.returnValue(throwError(() => new Error('Erro')));
      (component as any).adicionar();
      tick();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/erro']);
    }));
  });

  describe('editar', () => {
    it('deve navegar para /segurado ao editar com sucesso', fakeAsync(() => {
      spyOn(seguroService, 'update').and.returnValue(of({}));
      (component as any).editar();
      tick();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/segurado']);
    }));

    it('deve navegar para /erro ao falhar editar', fakeAsync(() => {
      spyOn(seguroService, 'update').and.returnValue(throwError(() => new Error('Erro')));
      (component as any).editar();
      tick();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/erro']);
    }));
  });

});
