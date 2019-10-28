import { TestBed } from '@angular/core/testing';

import { OperadoresService } from './operadores.service';

describe('OperadoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperadoresService = TestBed.get(OperadoresService);
    expect(service).toBeTruthy();
  });
});
