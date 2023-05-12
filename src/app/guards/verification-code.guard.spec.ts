import { TestBed } from '@angular/core/testing';

import { VerificationCodeGuard } from './verification-code.guard';

describe('VerificationCodeGuard', () => {
  let guard: VerificationCodeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VerificationCodeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
