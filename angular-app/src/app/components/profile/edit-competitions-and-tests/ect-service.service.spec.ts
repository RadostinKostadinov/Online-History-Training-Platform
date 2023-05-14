import { TestBed } from '@angular/core/testing';

import { EctServiceService } from './ect-service.service';

describe('EctServiceService', () => {
  let service: EctServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EctServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
