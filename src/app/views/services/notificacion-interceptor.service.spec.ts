import { TestBed } from '@angular/core/testing';

import { NotificacionInterceptorService } from './notificacion-interceptor.service';

describe('NotificacionInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificacionInterceptorService = TestBed.get(NotificacionInterceptorService);
    expect(service).toBeTruthy();
  });
});
