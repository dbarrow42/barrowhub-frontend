import { TestBed } from '@angular/core/testing';

import { HeroBackgroundService } from './hero-background.service';

describe('HeroBackgroundService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeroBackgroundService = TestBed.get(HeroBackgroundService);
    expect(service).toBeTruthy();
  });
});
