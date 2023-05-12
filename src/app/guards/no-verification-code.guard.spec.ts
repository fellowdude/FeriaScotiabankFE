import { TestBed } from '@angular/core/testing';

import { NoVerificationCodeGuard } from './no-verification-code.guard';

describe('NoVerificationCodeGuard', () => {
  let guard: NoVerificationCodeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoVerificationCodeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
