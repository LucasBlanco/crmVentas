import { TestBed } from '@angular/core/testing';

import { LocalidadesService } from './localidades.service';

describe('LocalidadesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalidadesService = TestBed.get(LocalidadesService);
    expect(service).toBeTruthy();
  });
});
