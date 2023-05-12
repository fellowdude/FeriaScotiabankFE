import { TestBed } from '@angular/core/testing';

import { LdvService } from './ldv.service';

describe('LdvService', () => {
  let service: LdvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LdvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
