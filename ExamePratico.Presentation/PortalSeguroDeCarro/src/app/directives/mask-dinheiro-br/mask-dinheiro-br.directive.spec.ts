import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

import { MaskDinheiroBrDirective } from './mask-dinheiro-br.directive';

@Component({
  template: `<input type="text" [formControl]="control" appMaskDinheiroBr />`,
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MaskDinheiroBrDirective],
})
class TestHostComponent {
  control = new FormControl('');
}

describe('MaskDinheiroBrDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    input = fixture.debugElement.query(By.css('input')).nativeElement;
  });

  it('deve formatar valor como moeda BR ao digitar', () => {
    input.value = '1234';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(input.value).toBe('R$\u00a012,34'); // usa espaço sem quebra (NBSP)
  });

  it('deve propagar o valor formatado para o FormControl', () => {
    input.value = '5678';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.componentInstance.control.value).toBe('R$\u00a056,78');
  });

  it('deve formatar como R$ 0,00 quando o usuário apaga o valor', () => {
    let valorForm: string | null = null;

    // Recupera a diretiva
    const directive = fixture.debugElement
      .query(By.directive(MaskDinheiroBrDirective))
      .injector.get(MaskDinheiroBrDirective);

    directive.registerOnChange((val: string) => (valorForm = val));

    // Simula usuário limpando o input
    input.value = '';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(input.value).toBe('R$\u00A00,00'); // NBSP entre R$ e valor
    // expect(valorForm).toBe('R$\u00A00,00');
  });

  it('deve chamar onTouched no blur', () => {
    let touchedCalled = false;

    // Recupera a instância da diretiva aplicada no input
    const directive = fixture.debugElement
      .query(By.directive(MaskDinheiroBrDirective))
      .injector.get(MaskDinheiroBrDirective);

    directive.registerOnTouched(() => (touchedCalled = true));

    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(touchedCalled).toBeTrue();
  });

  it('deve aceitar valores via writeValue', () => {
    fixture.componentInstance.control.setValue('R$\u00a010,00');
    fixture.detectChanges();

    expect(input.value).toBe('R$\u00a010,00');
  });

  it('deve desabilitar o campo com setDisabledState', () => {
    fixture.componentInstance.control.disable();
    fixture.detectChanges();

    expect(input.disabled).toBeTrue();
  });
});
