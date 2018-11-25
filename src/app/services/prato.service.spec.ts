import { TestBed, inject } from '@angular/core/testing';

import { PratoService } from './prato.service';

describe('PratoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PratoService]
    });
  });

  it('should be created', inject([PratoService], (service: PratoService) => {
    expect(service).toBeTruthy();
  }));
});
