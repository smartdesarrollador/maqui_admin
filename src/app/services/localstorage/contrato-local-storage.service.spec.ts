import { TestBed } from '@angular/core/testing';

import { ContratoLocalStorageService } from './contrato-local-storage.service';

describe('ContratoLocalStorageService', () => {
  let service: ContratoLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContratoLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
