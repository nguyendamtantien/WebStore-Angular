/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MiddlewareService } from './middleware.service';

describe('Service: Middleware', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MiddlewareService]
    });
  });

  it('should ...', inject([MiddlewareService], (service: MiddlewareService) => {
    expect(service).toBeTruthy();
  }));
});
