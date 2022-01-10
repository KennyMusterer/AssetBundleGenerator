import { TestBed } from '@angular/core/testing';

import { UnityService } from './unity.service';

describe('UnityService', () => {
  let service: UnityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
