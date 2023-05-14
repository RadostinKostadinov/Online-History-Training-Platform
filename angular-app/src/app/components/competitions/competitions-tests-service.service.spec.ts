import { TestBed } from '@angular/core/testing';

import { CompetitionsTestsServiceService } from './competitions-tests-service.service';

describe('CompetitionsTestsServiceService', () => {
  let service: CompetitionsTestsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompetitionsTestsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
