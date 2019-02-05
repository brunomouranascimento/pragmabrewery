import { TestBed } from '@angular/core/testing';

import { DaytimeService } from './daytime.service';

describe('DaytimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DaytimeService = TestBed.get(DaytimeService);
    expect(service).toBeTruthy();
  });
});
