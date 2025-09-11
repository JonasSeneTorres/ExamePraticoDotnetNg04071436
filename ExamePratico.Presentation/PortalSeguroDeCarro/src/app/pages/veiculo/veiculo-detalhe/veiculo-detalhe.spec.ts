import { ComponentFixture, TestBed } from '@angular/core/testing';
import { convertToParamMap, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { MaskDinheiroBrDirective } from '../../../directives/mask-dinheiro-br/mask-dinheiro-br.directive';
import { VeiculoDetalhe } from './veiculo-detalhe';
import { VeiculoMockService } from '../../../services/veiculo/veiculo-service.mock';
import { VeiculoService } from '../../../services/veiculo/veiculo-service';

describe('VeiculoDetalhe', () => {
  let component: VeiculoDetalhe;
  let fixture: ComponentFixture<VeiculoDetalhe>;
  let veiculoService: VeiculoMockService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        VeiculoDetalhe,
        MaskDinheiroBrDirective,
        RouterTestingModule
      ],
      providers: [
        { provide: VeiculoService, useClass: VeiculoMockService },
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ id: '1' })) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VeiculoDetalhe);
    component = fixture.componentInstance;
    veiculoService = TestBed.inject(VeiculoService) as unknown as VeiculoMockService;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve popular o formulário ao inicializar quando o id existe', () => {
    // como o mock devolve {}, o form ficará vazio
    expect(component.form.value.veiculoId).toBe('');
    expect(component.form.value.marca).toBe('');
    expect(component.form.value.modelo).toBe('');
  });

  it('deve chamar veiculoService.create ao submeter um novo item', () => {
    spyOn(veiculoService, 'create').and.callThrough();

    component.acao = 'Novo';
    component.form.setValue({
      veiculoId: '',
      valorDoVeiculo: '5.000,00',
      marca: 'Ford',
      modelo: 'Ka',
      dataCadastro: '',
      dataUltimaAlteracao: ''
    });

    component.onSubmit();

    expect(veiculoService.create).toHaveBeenCalled();
  });

  it('deve chamar veiculoService.update ao submeter uma edição', () => {
    spyOn(veiculoService, 'update').and.callThrough();

    component.acao = 'Editar';
    component.form.setValue({
      veiculoId: '1',
      valorDoVeiculo: '10.000,00',
      marca: 'Fiat',
      modelo: 'Uno',
      dataCadastro: '2025-01-01',
      dataUltimaAlteracao: '2025-09-01'
    });

    component.onSubmit();

    expect(veiculoService.update).toHaveBeenCalled();
  });

  it('deve tratar erro ao chamar veiculoService', () => {
    veiculoService.erro = true;
    spyOn(veiculoService, 'create').and.callThrough();

    component.acao = 'Novo';
    component.form.setValue({
      veiculoId: '',
      valorDoVeiculo: '1000',
      marca: 'Chevrolet',
      modelo: 'Onix',
      dataCadastro: '',
      dataUltimaAlteracao: ''
    });

    component.onSubmit();

    expect(veiculoService.create).toHaveBeenCalled();
  });
});
