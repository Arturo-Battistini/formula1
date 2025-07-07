/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GlobalInfooService } from './globalInfoo.service';

describe('Service: GlobalInfoo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalInfooService]
    });
  });

  it('should ...', inject([GlobalInfooService], (service: GlobalInfooService) => {
    expect(service).toBeTruthy();
  }));
});
