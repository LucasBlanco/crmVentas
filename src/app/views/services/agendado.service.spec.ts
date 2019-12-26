import { TestBed } from '@angular/core/testing';

import { AgendadoService } from './agendado.service';

describe('AgendadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgendadoService = TestBed.get(AgendadoService);
    expect(service).toBeTruthy();
  });
});
