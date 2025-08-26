import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Erro } from './erro';

describe('Erro', () => {
  let component: Erro;
  let fixture: ComponentFixture<Erro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Erro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Erro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
