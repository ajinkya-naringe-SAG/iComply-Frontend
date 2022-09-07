import { TestBed } from '@angular/core/testing';

import { RepoFilterService } from './repo-filter.service';

describe('RepoFilterService', () => {
  let service: RepoFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepoFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
