import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { Segurado } from './segurado';
import { SeguradoMockService } from '../../services/segurado/segurado-service.mock';
import { SeguradoService } from '../../services/segurado/segurado-service';

describe('Segurado', () => {
  let component: Segurado;
  let fixture: ComponentFixture<Segurado>;
  let mockService: SeguradoMockService;
  let routerSpy: jasmine.SpyObj<Router>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<any>>;

  beforeEach(async () => {
    // Mock MatDialogRef
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(true)); // padrão para confirmação

    // Mock MatDialog
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    dialogSpy.open.and.returnValue(dialogRefSpy);

    // Mock Router
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Mock ActivatedRoute
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: { paramMap: { get: () => null } },
    });

    await TestBed.configureTestingModule({
      imports: [Segurado],
      providers: [
        { provide: SeguradoService, useClass: SeguradoMockService },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Segurado);
    component = fixture.componentInstance;

    mockService = TestBed.inject(SeguradoService) as unknown as SeguradoMockService;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('deve carregar lista com sucesso', fakeAsync(() => {
      const dados = [{ nome: 'Segurado 1' }, { nome: 'Segurado 2' }];
      spyOn(mockService, 'getAll').and.returnValue(of(dados));

      component.ngOnInit();
      tick();

      expect(component.lista).toEqual(dados);
      expect(component.processando).toBeFalse();
    }));

    it('deve navegar para /erro se houver erro', fakeAsync(() => {
      spyOn(mockService, 'getAll').and.returnValue(throwError(() => ({ error: 'Erro' })));

      component.ngOnInit();
      tick();

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/erro']);
    }));
  });

  describe('openDialog', () => {
    it('deve abrir diálogo e deletar segurado ao confirmar', fakeAsync(() => {
      const segurado = { nome: 'Teste', seguradoId: 1 };
      spyOn(mockService, 'delete').and.returnValue(of(undefined));
      spyOn(component as any, 'carregarLista');

      component.openDialog(segurado);
      tick();

      expect(dialogSpy.open).toHaveBeenCalled();
      expect(mockService.delete).toHaveBeenCalledWith(segurado.seguradoId);
      expect(component['carregarLista']).toHaveBeenCalled();
    }));

    it('não deve deletar segurado se cancelar diálogo', fakeAsync(() => {
      dialogRefSpy.afterClosed.and.returnValue(of(false));
      const segurado = { nome: 'Teste', seguradoId: 1 };
      spyOn(mockService, 'delete');
      spyOn(component as any, 'carregarLista');

      component.openDialog(segurado);
      tick();

      expect(mockService.delete).not.toHaveBeenCalled();
      expect(component['carregarLista']).not.toHaveBeenCalled();
    }));
  });

});
