import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraNavegacao } from './barra-navegacao';

describe('BarraNavegacao', () => {
  let component: BarraNavegacao;
  let fixture: ComponentFixture<BarraNavegacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraNavegacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarraNavegacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
