import { Directive, HostListener, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[appMaskDinheiroBr]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MaskDinheiroBrDirective),
      multi: true
    }
  ]
})
export class MaskDinheiroBrDirective implements ControlValueAccessor {
  private el: HTMLInputElement;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  @HostListener('input')
  onInput() {
    let value = this.el.value;

    // remove tudo que não seja dígito
    value = value.replace(/\D/g, '');

    // converte para número com 2 casas decimais
    const numericValue = parseFloat(value || '0') / 100;

    // formata como moeda BRL
    const formatted = numericValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    // atualiza o input visualmente
    this.el.value = formatted;

    // envia para o FormControl **exatamente como string**
    this.onChange(formatted);
  }

  @HostListener('blur')
  onBlur() {
    this.onTouched();
  }

  // Interface ControlValueAccessor
  writeValue(value: string): void {
    this.el.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.el.disabled = isDisabled;
  }
}
