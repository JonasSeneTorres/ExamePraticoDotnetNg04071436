import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Veiculo } from './veiculo';

describe('Veiculo', () => {
  let component: Veiculo;
  let fixture: ComponentFixture<Veiculo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Veiculo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Veiculo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
