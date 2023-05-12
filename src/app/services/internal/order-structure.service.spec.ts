import { TestBed } from '@angular/core/testing';

import { OrderStructureService } from './order-structure.service';

describe('OrderStructureService', () => {
  let service: OrderStructureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderStructureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
