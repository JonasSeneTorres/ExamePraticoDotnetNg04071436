import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Router, RouterModule, ActivatedRoute, ParamMap } from '@angular/router';

import { SeguradoMockService } from '../../../services/segurado/segurado-service.mock';
import { SeguradoService } from '../../../services/segurado/segurado-service';
import { SeguroDetalhe } from './seguro-detalhe';
import { SeguroMockService } from '../../../services/seguro/seguro-service.mock';
import { SeguroService } from '../../../services/seguro/seguro-service';
import { VeiculoMockService } from '../../../services/veiculo/veiculo-service.mock';
import { VeiculoService } from '../../../services/veiculo/veiculo-service';

describe('SeguroDetalhe', () => {
  let component: SeguroDetalhe;
  let fixture: ComponentFixture<SeguroDetalhe>;
  let routerSpy: jasmine.SpyObj<Router>;
  let seguradoService: SeguradoMockService;
  let seguroService: SeguroMockService;
  let veiculoService: VeiculoMockService;

  const activatedRouteSpy = {
    paramMap: of({
      get: (key: string) => null
    } as unknown as ParamMap)
  } as ActivatedRoute;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [RouterModule, SeguroDetalhe],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: SeguradoService, useClass: SeguradoMockService },
        { provide: SeguroService, useClass: SeguroMockService },
        { provide: VeiculoService, useClass: VeiculoMockService },
      ]
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

  describe('iniciarTela', () => {
    it('deve criar novo item quando não houver id na rota', fakeAsync(() => {
      component['iniciarTela']();
      tick();
      expect(component['acao']).toBe('Novo');
    }));

    // it('deve chamar alterarItem quando houver id na rota', fakeAsync(() => {
    //   const activatedRouteWithId = {
    //     paramMap: of({
    //       get: (key: string) => key === 'id' ? '123' : null
    //     } as unknown as ParamMap)
    //   } as ActivatedRoute;

    //   component = new SeguroDetalhe(
    //     routerSpy,
    //     activatedRouteWithId,
    //     seguroService,
    //     seguradoService,
    //     veiculoService
    //   );

    //   spyOn(component as any, 'alterarItem');
    //   component['iniciarTela']();
    //   tick();

    //   expect(component['alterarItem']).toHaveBeenCalledWith('123');
    // }));
  });

  describe('ngOnInit', () => {
    it('deve inicializar tela e carregar listas de veiculos e segurados', fakeAsync(() => {
      const veiculos = [{ veiculoId: 1 }];
      const segurados = [{ seguradoId: 2 }];
      spyOn(veiculoService, 'getAll').and.returnValue(of(veiculos));
      spyOn(seguradoService, 'getAll').and.returnValue(of(segurados));

      component.ngOnInit();
      tick();

      expect(component.listaVeiculos).toEqual(veiculos);
      expect(component.listaSegurados).toEqual(segurados);
    }));

    it('deve navegar para /erro se falhar ao carregar listas', fakeAsync(() => {
      spyOn(veiculoService, 'getAll').and.returnValue(throwError(() => new Error('Falha')));
      spyOn(seguradoService, 'getAll').and.returnValue(of([]));

      component.ngOnInit();
      tick();

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/erro']);
    }));
  });

  describe('adicionar', () => {
    it('deve chamar create e navegar para /seguro', fakeAsync(() => {
      component['acao'] = 'Novo';
      spyOn(seguroService, 'create').and.returnValue(of({}));

      component.onSubmit();
      tick();

      expect(seguroService.create).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/seguro']);
    }));

    it('deve navegar para /erro se create falhar', fakeAsync(() => {
      component['acao'] = 'Novo';
      spyOn(seguroService, 'create').and.returnValue(throwError(() => new Error('Falha')));

      component.onSubmit();
      tick();

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/erro']);
    }));
  });

  describe('editar', () => {
    it('deve chamar update e navegar para /segurado', fakeAsync(() => {
      component['acao'] = 'Editar';
      spyOn(seguroService, 'update').and.returnValue(of({}));

      component.onSubmit();
      tick();

      expect(seguroService.update).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/segurado']);
    }));

    it('deve navegar para /erro se update falhar', fakeAsync(() => {
      component['acao'] = 'Editar';
      spyOn(seguroService, 'update').and.returnValue(throwError(() => new Error('Falha')));

      component.onSubmit();
      tick();

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/erro']);
    }));
  });

  // describe('atualizarIdade', () => {
  //   it('deve calcular corretamente a idade com base na data de nascimento', () => {
  //     const hoje = new Date();
  //     const nascimento = new Date(hoje.getFullYear() - 30, hoje.getMonth(), hoje.getDate());
  //     component['atualizarIdade'](nascimento.toISOString().split('T')[0]);

  //     expect(component.form.value.idade).toBe(30);
  //   });
  // });
});
