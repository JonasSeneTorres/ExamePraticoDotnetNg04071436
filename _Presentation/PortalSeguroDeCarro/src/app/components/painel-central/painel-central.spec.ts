import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelCentral } from './painel-central';

describe('PainelCentral', () => {
  let component: PainelCentral;
  let fixture: ComponentFixture<PainelCentral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelCentral]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelCentral);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
