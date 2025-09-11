import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, NgControl } from '@angular/forms';

import { MaskNumericaBrDirective } from './mask-numerica-br.directive';

@Component({
  selector: 'app-test-host',
  template: `<input appMaskNumericaBr [decimals]="decimals" [ngModel]="value">`,
  standalone: true,
  imports: [MaskNumericaBrDirective, FormsModule, ReactiveFormsModule],
})
class TestHostComponent {
  value = '';
  decimals = 2;
}

describe('MaskNumericaBrDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let inputEl: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    inputEl = fixture.nativeElement.querySelector('input') as HTMLInputElement;
  });

  it('deve inicializar com valor formatado 0,00', () => {
    expect(inputEl.value).toBe('0,00');
  });

  it('deve formatar corretamente ao digitar', fakeAsync(() => {
    inputEl.value = '1234';
    inputEl.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();

    expect(inputEl.value).toBe('12,34');
  }));

  it('deve formatar corretamente ao colar', fakeAsync(() => {
    const clipboardEvent = new ClipboardEvent('paste', {
      clipboardData: new DataTransfer(),
    });
    clipboardEvent.clipboardData?.setData('text', '5678');

    inputEl.dispatchEvent(clipboardEvent);
    tick();
    fixture.detectChanges();

    expect(inputEl.value).toBe('56,78');
  }));

  it('deve manter o cursor no final ao focar', fakeAsync(() => {
    inputEl.value = '12,34';
    inputEl.dispatchEvent(new Event('focus'));
    tick();
    fixture.detectChanges();

    expect(inputEl.selectionStart).toBe(inputEl.value.length);
    expect(inputEl.selectionEnd).toBe(inputEl.value.length);
  }));

  it('deve corrigir valor ao perder o foco', fakeAsync(() => {
    inputEl.value = '1234';
    inputEl.dispatchEvent(new Event('blur'));
    tick();
    fixture.detectChanges();

    expect(inputEl.value).toBe('12,34');
  }));
});
