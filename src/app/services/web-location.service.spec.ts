import { TestBed } from '@angular/core/testing';

import { WebLocationService } from './web-location.service';

describe('WebLocationService', () => {
  let service: WebLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
