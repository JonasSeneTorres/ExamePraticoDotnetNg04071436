import { TestBed } from '@angular/core/testing';

import { SeguradoService } from './segurado-service';

describe('SeguradoService', () => {
  let service: SeguradoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeguradoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
