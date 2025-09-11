import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { Veiculo } from './veiculo';
import { VeiculoMockService } from '../../services/veiculo/veiculo-service.mock';
import { VeiculoService } from '../../services/veiculo/veiculo-service';

describe('Veiculo', () => {
  let component: Veiculo;
  let fixture: ComponentFixture<Veiculo>;
  let mockService: VeiculoMockService;
  let routerSpy: jasmine.SpyObj<Router>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<any>>;

  beforeEach(async () => {
    // Mock do MatDialogRef
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(true));

    // Mock do MatDialog
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    dialogSpy.open.and.returnValue(dialogRefSpy);

    // Mock do Router
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Mock do ActivatedRoute
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: { paramMap: { get: () => null } }
    });

    await TestBed.configureTestingModule({
      imports: [Veiculo],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        { provide: Router, useValue: routerSpy },
        { provide: VeiculoService, useClass: VeiculoMockService },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Veiculo);
    component = fixture.componentInstance;
    mockService = TestBed.inject(VeiculoService) as unknown as VeiculoMockService;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('deve carregar lista com sucesso', fakeAsync(() => {
      const dados = [{ veiculoId: 1, nome: 'Veiculo 1' }, { veiculoId: 2, nome: 'Veiculo 2' }];
      spyOn(mockService, 'getAll').and.returnValue(of(dados));

      component.ngOnInit();
      tick();

      expect(component.lista).toEqual(dados);
      expect(component.processando).toBeFalse();
    }));

    it('deve navegar para /erro em caso de falha', fakeAsync(() => {
      spyOn(mockService, 'getAll').and.returnValue(throwError(() => ({ error: 'Erro' })));

      component.ngOnInit();
      tick();

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/erro']);
    }));
  });

  describe('openDialog', () => {
    it('deve abrir diálogo e deletar veiculo ao confirmar', fakeAsync(() => {
      const veiculo = { veiculoId: 1, nome: 'Veiculo Teste' };
      spyOn(mockService, 'delete').and.returnValue(of(undefined));
      spyOn(component as any, 'carregarLista');

      component.openDialog(veiculo);
      tick();

      expect(dialogSpy.open).toHaveBeenCalled();
      expect(mockService.delete).toHaveBeenCalledWith(veiculo.veiculoId);
      expect(component['carregarLista']).toHaveBeenCalled();
    }));

    it('não deve deletar veiculo se cancelar diálogo', fakeAsync(() => {
      dialogRefSpy.afterClosed.and.returnValue(of(false));
      const veiculo = { veiculoId: 1, nome: 'Veiculo Teste' };
      spyOn(mockService, 'delete');
      spyOn(component as any, 'carregarLista');

      component.openDialog(veiculo);
      tick();

      expect(mockService.delete).not.toHaveBeenCalled();
      expect(component['carregarLista']).not.toHaveBeenCalled();
    }));
  });
});
