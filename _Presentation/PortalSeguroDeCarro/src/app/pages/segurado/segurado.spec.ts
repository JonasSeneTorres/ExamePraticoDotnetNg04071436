import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Segurado } from './segurado';

describe('Segurado', () => {
  let component: Segurado;
  let fixture: ComponentFixture<Segurado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Segurado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Segurado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
