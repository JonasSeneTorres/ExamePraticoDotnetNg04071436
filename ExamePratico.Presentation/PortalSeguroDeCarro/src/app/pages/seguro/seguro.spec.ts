import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { Seguro } from './seguro';
import { SeguroMockService } from '../../services/seguro/seguro-service.mock';
import { SeguroService } from '../../services/seguro/seguro-service';

describe('Seguro', () => {
  let component: Seguro;
  let fixture: ComponentFixture<Seguro>;
  let mockService: SeguroMockService;
  let routerSpy: jasmine.SpyObj<Router>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<any>>;

  beforeEach(async () => {
    // Mock MatDialogRef
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(true)); // confirmação padrão

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
      imports: [Seguro],
      providers: [
        { provide: SeguroService, useClass: SeguroMockService },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Seguro);
    component = fixture.componentInstance;

    mockService = TestBed.inject(SeguroService) as unknown as SeguroMockService;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('deve carregar lista com sucesso', fakeAsync(() => {
      const dados = [{ nome: 'Seguro 1' }, { nome: 'Seguro 2' }];
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
    it('deve abrir diálogo e deletar seguro ao confirmar', fakeAsync(() => {
      const seguro = { nome: 'Teste', seguradoId: 1 };
      spyOn(mockService, 'delete').and.returnValue(of(undefined));
      spyOn(component as any, 'carregarLista');

      component.openDialog(seguro);
      tick();

      expect(dialogSpy.open).toHaveBeenCalled();
      expect(mockService.delete).toHaveBeenCalledWith(seguro.seguradoId);
      expect(component['carregarLista']).toHaveBeenCalled();
    }));

    it('não deve deletar seguro se cancelar diálogo', fakeAsync(() => {
      dialogRefSpy.afterClosed.and.returnValue(of(false));
      const seguro = { nome: 'Teste', seguradoId: 1 };
      spyOn(mockService, 'delete');
      spyOn(component as any, 'carregarLista');

      component.openDialog(seguro);
      tick();

      expect(mockService.delete).not.toHaveBeenCalled();
      expect(component['carregarLista']).not.toHaveBeenCalled();
    }));
  });
});
