import { TestBed } from '@angular/core/testing';

import { AfkService } from './afk.service';

describe('AfkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AfkService = TestBed.get(AfkService);
    expect(service).toBeTruthy();
  });
});
