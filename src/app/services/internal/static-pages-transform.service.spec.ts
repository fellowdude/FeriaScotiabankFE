import { TestBed } from '@angular/core/testing';

import { StaticPagesTransformService } from './static-pages-transform.service';

describe('StaticPagesTransformService', () => {
  let service: StaticPagesTransformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticPagesTransformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
