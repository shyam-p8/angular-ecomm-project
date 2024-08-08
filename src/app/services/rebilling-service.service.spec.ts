import { TestBed } from '@angular/core/testing';

import { RebillingServiceService } from './rebilling-service.service';

describe('RebillingServiceService', () => {
  let service: RebillingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RebillingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
