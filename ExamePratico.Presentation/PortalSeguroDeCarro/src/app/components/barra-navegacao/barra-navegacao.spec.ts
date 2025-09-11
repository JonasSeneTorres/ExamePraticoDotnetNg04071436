import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BarraNavegacao } from './barra-navegacao';

describe('BarraNavegacao', () => {
  let component: BarraNavegacao;
  let fixture: ComponentFixture<BarraNavegacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraNavegacao, RouterTestingModule]
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
