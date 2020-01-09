import { TestBed } from '@angular/core/testing';

import { ActividadSesionService } from './actividad-sesion.service';

describe('ActividadSesionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActividadSesionService = TestBed.get(ActividadSesionService);
    expect(service).toBeTruthy();
  });
});
