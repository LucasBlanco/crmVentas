import { TestBed } from '@angular/core/testing';

import { ObrasSocialesService } from './obras-sociales.service';

describe('ObrasSocialesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObrasSocialesService = TestBed.get(ObrasSocialesService);
    expect(service).toBeTruthy();
  });
});
