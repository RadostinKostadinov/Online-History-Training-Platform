import { TestBed } from '@angular/core/testing';

import { EditResourcesService } from './edit-resources.service';

describe('EditResourcesService', () => {
  let service: EditResourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditResourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
