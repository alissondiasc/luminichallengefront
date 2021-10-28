import { TestBed } from '@angular/core/testing';

import { LuminiApiService } from './lumini-api.service';

describe('LuminiApiService', () => {
  let service: LuminiApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LuminiApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
