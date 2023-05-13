import { TestBed } from '@angular/core/testing';

import { EditTestService } from './edit-test.service';

describe('EditTestService', () => {
  let service: EditTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
