import { TestBed, inject } from '@angular/core/testing';

import { LocalizacaoService } from './localizacao.service';

describe('LocalizacaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalizacaoService]
    });
  });

  it('should be created', inject([LocalizacaoService], (service: LocalizacaoService) => {
    expect(service).toBeTruthy();
  }));
});
