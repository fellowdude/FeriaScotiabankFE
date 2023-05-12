import { TestBed } from '@angular/core/testing';

import { CartStructureService } from './cart-structure.service';

describe('CartStructureService', () => {
  let service: CartStructureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartStructureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
