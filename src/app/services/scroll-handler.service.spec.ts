import { TestBed } from '@angular/core/testing';

import { ScrollHandlerService } from './scroll-handler.service';

describe('ScrollHandlerService', () => {
  let service: ScrollHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
