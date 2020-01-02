import { TestBed } from '@angular/core/testing';

import { SesionOperadorService } from './sesion-operador.service';

describe('SesionOperadorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SesionOperadorService = TestBed.get(SesionOperadorService);
    expect(service).toBeTruthy();
  });
});
