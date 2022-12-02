import { TestBed } from '@angular/core/testing';

import { SneakersService } from './sneakers.service';

describe('SneakersService', () => {
  let service: SneakersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SneakersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
