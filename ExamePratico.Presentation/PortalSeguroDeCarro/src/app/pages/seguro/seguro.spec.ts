import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Seguro } from './seguro';

describe('Seguro', () => {
  let component: Seguro;
  let fixture: ComponentFixture<Seguro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Seguro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Seguro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
