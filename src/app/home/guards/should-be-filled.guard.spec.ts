import { TestBed } from '@angular/core/testing';

import { ShouldBeFilledGuard } from './should-be-filled.guard';

describe('ShouldBeFilledGuard', () => {
  let guard: ShouldBeFilledGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ShouldBeFilledGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
