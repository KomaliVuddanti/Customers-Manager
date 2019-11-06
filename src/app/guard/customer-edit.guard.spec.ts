import { TestBed, async, inject } from '@angular/core/testing';

import { CustomerEditGuard } from './customer-edit.guard';

describe('CustomerEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerEditGuard]
    });
  });

  it('should ...', inject([CustomerEditGuard], (guard: CustomerEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
