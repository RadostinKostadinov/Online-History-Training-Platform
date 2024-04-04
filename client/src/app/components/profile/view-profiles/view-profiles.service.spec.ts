import { TestBed } from '@angular/core/testing';

import { ViewProfilesService } from './view-profiles.service';

describe('ViewProfilesService', () => {
  let service: ViewProfilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewProfilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
