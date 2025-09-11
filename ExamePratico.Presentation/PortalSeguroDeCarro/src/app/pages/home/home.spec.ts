import { MatDialog } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog';
import { formatNumberToCurrency } from '../../utilitaries-function/parseNumberToCurrent';
import { Home } from './home';
import { SeguroService } from '../../services/seguro/seguro-service';

describe('Home Component', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let seguroServiceSpy: jasmine.SpyObj<SeguroService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    seguroServiceSpy = jasmine.createSpyObj('SeguroService', [
      'getMedia',
      'delete',
      'getRelatorio'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [Home], // standalone
      providers: [
        { provide: SeguroService, useValue: seguroServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('deve carregar lista com sucesso no ngOnInit', () => {
      seguroServiceSpy.getMedia.and.returnValue(of([{ mediaValorDoSeguro: 1000 }]));
      component.ngOnInit();
      expect(seguroServiceSpy.getMedia).toHaveBeenCalled();
      expect(component.lista[0].mediaValorDoSeguro).toBe(formatNumberToCurrency(1000));
      expect(component.processando).toBeFalse();
    });
  
    it('deve tratar erro "Nenhum seguro encontrado."', () => {
      seguroServiceSpy.getMedia.and.returnValue(
        throwError(() => ({ error: 'Nenhum seguro encontrado.' }))
      );
      component.ngOnInit();
      expect(component.lista).toEqual([]);
      expect(component.processando).toBeFalse();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('deve navegar para /erro em outros erros', () => {
      seguroServiceSpy.getMedia.and.returnValue(
        throwError(() => ({ error: 'Erro inesperado' }))
      );
      component.ngOnInit();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/erro']);
      expect(component.processando).toBeFalse();
    });
  });

  describe('openDialog', () => {
    it('deve abrir o dialog e excluir quando confirmado', () => {
      const afterClosed$ = of(true);
      dialogSpy.open.and.returnValue({ afterClosed: () => afterClosed$ } as any);
      seguroServiceSpy.delete.and.returnValue(of(void 0));
      seguroServiceSpy.getMedia.and.returnValue(of([]));
  
      component.openDialog({ seguradoId: 1, nome: 'Teste' });
  
      expect(dialogSpy.open).toHaveBeenCalledWith(ConfirmDialogComponent, jasmine.any(Object));
      expect(seguroServiceSpy.delete).toHaveBeenCalledWith(1);
      expect(seguroServiceSpy.getMedia).toHaveBeenCalled();
    });
  
    it('não deve excluir quando dialog retorna false', () => {
      const afterClosed$ = of(false);
      dialogSpy.open.and.returnValue({ afterClosed: () => afterClosed$ } as any);
  
      component.openDialog({ seguradoId: 1, nome: 'Teste' });
  
      expect(seguroServiceSpy.delete).not.toHaveBeenCalled();
    });
  });

  describe('formatNumberToCurrency', ()=> {
    it('deve formatar número corretamente', () => {
      const result = component.formatNumberToCurrency(1234.56);
      expect(result).toBe(formatNumberToCurrency(1234.56));
    });
  });

  describe('baixarRelatorioJson', () => {
    it('deve baixar relatório JSON', () => {
      spyOn(component, 'downloadJson');
      seguroServiceSpy.getRelatorio.and.returnValue(of([{ id: 1 }]));
  
      component.baixarRelatorioJson();
  
      expect(component.downloadJson).toHaveBeenCalledWith([{ id: 1 }], 'relatorio.json');
    });
  });

  describe('downloadJson', () => {
    it('deve chamar downloadJson corretamente', () => {
      spyOn(window.URL, 'createObjectURL').and.returnValue('blob:url');
      spyOn(window.URL, 'revokeObjectURL');
      spyOn(document, 'createElement').and.callThrough();
  
      const data = { test: 123 };
      component.downloadJson(data, 'arquivo.json');
  
      expect(window.URL.createObjectURL).toHaveBeenCalled();
      expect(window.URL.revokeObjectURL).toHaveBeenCalled(); 
    });
  });
});
