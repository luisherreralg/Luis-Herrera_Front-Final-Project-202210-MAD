import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Order } from 'src/app/types/order';
import { mockOrderInitialState } from '../../mocks/mocks';

import { CartModalComponent } from './cart-modal.component';

describe('CartModalComponent', () => {
  let component: CartModalComponent;
  let fixture: ComponentFixture<CartModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CartModalComponent],
      providers: [provideMockStore(mockOrderInitialState)],
    }).compileComponents();

    fixture = TestBed.createComponent(CartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When the ngOnInit es invoked', () => {
    it('should call to the orderServices', () => {
      const spy = spyOn(component.orderService, 'getOrders').and.returnValue(
        of({ orders: [] as Order[] })
      );

      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Given the completeOrders function, when its invoked', () => {
    it('should call to the orderService, and store dispatcher', () => {
      const spyOrderServiceGet = spyOn(
        component.orderService,
        'getOrders'
      ).and.returnValue(
        of({
          orders: mockOrderInitialState.initialState.orders.orders as Order[],
        })
      );
      const spyOrderServiceDelete = spyOn(
        component.orderService,
        'deleteOrder'
      ).and.returnValue(of({} as Order));

      const spyStoreDispatcher = spyOn(component.store, 'dispatch');

      component.completeOrders();
      expect(spyOrderServiceGet).toHaveBeenCalled();
      expect(spyOrderServiceDelete).toHaveBeenCalled();
      expect(spyStoreDispatcher).toHaveBeenCalled();
    });
  });

  describe('Given the handlerLoginModalEvent, when its invoked', () => {
    it('should call to the modalService', () => {
      const spymodalService = spyOn(component.modalService, 'cartModal');

      component.handlerLoginModalEvent();
      expect(spymodalService).toHaveBeenCalled();
    });
  });
});
