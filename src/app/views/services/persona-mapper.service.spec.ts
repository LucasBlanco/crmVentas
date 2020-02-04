import { TestBed } from '@angular/core/testing';

import { PersonaMapperService } from './persona-mapper.service';

describe('PersonaMapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonaMapperService = TestBed.get(PersonaMapperService);
    expect(service).toBeTruthy();
  });
});
