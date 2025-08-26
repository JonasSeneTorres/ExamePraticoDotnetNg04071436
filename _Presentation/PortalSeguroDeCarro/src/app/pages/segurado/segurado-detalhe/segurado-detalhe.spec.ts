import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguradoDetalhe } from './segurado-detalhe';

describe('SeguradoDetalhe', () => {
  let component: SeguradoDetalhe;
  let fixture: ComponentFixture<SeguradoDetalhe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguradoDetalhe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguradoDetalhe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
