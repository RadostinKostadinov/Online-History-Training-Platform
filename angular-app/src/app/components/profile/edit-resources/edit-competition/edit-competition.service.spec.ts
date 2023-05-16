import { TestBed } from '@angular/core/testing';

import { EditCompetitionService } from './edit-competition.service';

describe('EditCompetitionService', () => {
  let service: EditCompetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditCompetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
