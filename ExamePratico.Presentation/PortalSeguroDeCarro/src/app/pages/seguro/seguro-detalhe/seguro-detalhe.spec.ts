import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguroDetalhe } from './seguro-detalhe';

describe('SeguroDetalhe', () => {
  let component: SeguroDetalhe;
  let fixture: ComponentFixture<SeguroDetalhe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguroDetalhe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguroDetalhe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
