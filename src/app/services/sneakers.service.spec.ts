import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProtoSneaker, Sneaker } from '../types/sneaker';

import { SneakersService } from './sneakers.service';

describe('SneakersService', () => {
  const mockSneaker: Sneaker = {
    id: 'TestId',
    brand: 'TestBrand',
    model: 'TestModel',
    size: ['40'],
    price: 0,
    onSalePrice: 0,
    onSale: false,
    stock: 0,
    gender: 'male',
    images: ['url'],
  };

  let service: SneakersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SneakersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('When the getSneakers method is invoked', () => {
    it('should call to the HttpClient', () => {
      service.getSneakers().subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(JSON.stringify(resp)).toBe(JSON.stringify(mockSneaker));
      });
      expect(httpTestingController).toBeTruthy();
    });
  });

  describe('When the getSneaker method is invoked', () => {
    it('should call to the HttpClient', () => {
      service.getSneaker('TestId').subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(JSON.stringify(resp)).toBe(JSON.stringify(mockSneaker));
      });
      expect(httpTestingController).toBeTruthy();
    });
  });

  describe('When the searchSneakers method is invoked', () => {
    it('should call to the HttpClient', () => {
      service.searchSneakers('TestBrand').subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(JSON.stringify(resp)).toBe(JSON.stringify(mockSneaker));
      });
      expect(httpTestingController).toBeTruthy();
    });
  });

  describe('When the postSneaker method is invoked', () => {
    const sneakerToPost: ProtoSneaker = { ...mockSneaker };

    it('should call to the HttpClient', () => {
      service.postSneaker(sneakerToPost, 'token').subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(JSON.stringify(resp)).toBe(JSON.stringify(sneakerToPost));
      });
      expect(httpTestingController).toBeTruthy();
    });
  });

  describe('When the deleteSneaker method is invoked', () => {
    it('should call to the HttpClient', () => {
      service.deleteSneaker(mockSneaker.id, 'token').subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(JSON.stringify(resp)).toBe(JSON.stringify(mockSneaker));
      });
      expect(httpTestingController).toBeTruthy();
    });
  });
});
