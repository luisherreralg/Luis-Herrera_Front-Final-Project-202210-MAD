import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Order, ProtoOrder } from '../types/order';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  const mockOrder: Order = {
    size: [],
    cartedItem: {
      id: '',
      brand: '',
      model: '',
      size: [],
      price: 0,
      onSalePrice: 0,
      onSale: '',
      stock: 0,
      gender: '',
      images: [],
    },
    cartedBy: {
      id: '',
      name: '',
      surname: '',
      email: '',
      password: '',
      role: 'user',
    },
    orderId: '',
    amount: 0,
  };

  let service: OrdersService;
  let httpTest: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(OrdersService);
    httpTest = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('When the getOrders method is invoked', () => {
    it('should call to the HttpClient', () => {
      service.getOrders().subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(JSON.stringify(resp)).toBe(JSON.stringify(mockOrder));
      });
      expect(httpTest).toBeTruthy();
    });
  });

  describe('When the postOrder method is invoked', () => {
    it('should call to the HttpClient', () => {
      const newOrder: ProtoOrder = {
        size: '35.5',
        amount: 1,
      };

      service.postOrder(newOrder, 'sneakerId').subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(JSON.stringify(resp)).toBe(JSON.stringify(newOrder));
      });
      expect(httpTest).toBeTruthy();
    });
  });

  describe('When the deleteOrder method is invoked', () => {
    it('should call to the HttpClient', () => {
      service.deleteOrder('sneakerId').subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(JSON.stringify(resp)).toBe(JSON.stringify({}));
      });
      expect(httpTest).toBeTruthy();
    });
  });
});
