import { TestBed } from '@angular/core/testing';

import { SchedulerApiService } from './scheduler.api.service';

describe('SchedulerApiService', () => {
  let service: SchedulerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
