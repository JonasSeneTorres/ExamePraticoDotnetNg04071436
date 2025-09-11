import { Directive, HostListener, ElementRef, Input, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appMaskNumericaBr]',
})
export class MaskNumericaBrDirective {
  @Input() decimals = 2; // padrão: 2 casas decimais

  private get input(): HTMLInputElement {
    return this.el.nativeElement as HTMLInputElement;
  }

  constructor(
    private el: ElementRef<HTMLInputElement>,
    @Optional() private controlDir: NgControl
  ) {}

  ngOnInit(): void {
    // Se já vier com valor, normaliza
    const digits = (this.input.value || '').replace(/\D/g, '');
    this.input.value = digits
      ? this.formatarDigitosComoDecimal(digits, this.decimals)
      : `0,${'0'.repeat(this.decimals)}`;
  }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const digits = (event.target.value || '').replace(/\D/g, '');
    const safeDigits = digits || '0';
    const numericValue = parseInt(safeDigits, 10) / Math.pow(10, this.decimals);
    this.controlDir?.control?.setValue(numericValue, { emitEvent: true });

    this.input.value = numericValue.toLocaleString('pt-BR', {
      minimumFractionDigits: this.decimals,
      maximumFractionDigits: this.decimals,
    });

    requestAnimationFrame(() => {
      const len = this.input.value.length;
      this.input.setSelectionRange(len, len);
    });
  }

  @HostListener('blur')
  onBlur(): void {
    const digits = this.input.value.replace(/\D/g, '');
    this.input.value = digits
      ? this.formatarDigitosComoDecimal(digits, this.decimals)
      : `0,${'0'.repeat(this.decimals)}`;
  }

  @HostListener('focus')
  onFocus(): void {
    requestAnimationFrame(() => {
      const len = this.input.value.length;
      this.input.setSelectionRange(len, len);
    });
  }

  @HostListener('paste', ['$event'])
  onPaste(e: ClipboardEvent): void {
    e.preventDefault();
    const text = (e.clipboardData?.getData('text') || '').replace(/\D/g, '');
    this.input.value = this.formatarDigitosComoDecimal(text, this.decimals);
    requestAnimationFrame(() => {
      const len = this.input.value.length;
      this.input.setSelectionRange(len, len);
    });
  }

  formatarDigitosComoDecimal(digitos: string, decimais: number = 2): string {
    const numeroLimpo = (digitos || '').replace(/\D/g, '');
    const numeroPreenchido = numeroLimpo.padStart(decimais + 1, '0');
    const ParteInteira = numeroPreenchido.slice(0, numeroPreenchido.length - decimais);
    const ParteFracionada = numeroPreenchido.slice(-decimais);
    const intFormatted = Number(ParteInteira).toLocaleString('pt-BR', { maximumFractionDigits: 0 });
    return `${intFormatted},${ParteFracionada}`;
  }
}
