import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Order } from 'src/app/types/order';
import { mockOrderInitialState } from 'src/app/utils/mocks/mocks';

import { CartListComponent } from './cart-list.component';

describe('CartListComponent', () => {
  let component: CartListComponent;
  let fixture: ComponentFixture<CartListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CartListComponent],
      providers: [provideMockStore(mockOrderInitialState)],
    }).compileComponents();

    fixture = TestBed.createComponent(CartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Given the deleteItemHandler method, when its invoked', () => {
    it('should call to the orderService and store ', () => {
      const spyOrderDelete = spyOn(
        component.orderService,
        'deleteOrder'
      ).and.returnValue(of({} as Order));
      const spyOrderGet = spyOn(
        component.orderService,
        'getOrders'
      ).and.returnValue(of({ orders: [] as Order[] }));
      const spyStore = spyOn(component.store, 'dispatch');

      component.deleteItemHandler('1');
      expect(spyOrderDelete).toHaveBeenCalled();
      expect(spyOrderGet).toHaveBeenCalled();
      expect(spyStore).toHaveBeenCalled();
    });
  });

  describe('Given the addAmountHandler method, when its invoked', () => {
    it('should call to the orderService and store', () => {
      const spyOrderServiceUpdate = spyOn(
        component.orderService,
        'updateOrder'
      ).and.returnValue(of({} as Order));
      const spyOrderServiceGet = spyOn(
        component.orderService,
        'getOrders'
      ).and.returnValue(of({ orders: [] }));
      const spyDispatcher = spyOn(component.store, 'dispatch');

      component.addAmountHandler(1, '');

      expect(spyOrderServiceUpdate).toHaveBeenCalled();
      expect(spyOrderServiceGet).toHaveBeenCalled();
      expect(spyDispatcher).toHaveBeenCalled();
    });
  });

  describe('Given the removeAmountHandler method, when its invoked', () => {
    it('should call to the orderService and store if the amount is bigger than "2"', () => {
      const spyOrderServiceUpdate = spyOn(
        component.orderService,
        'updateOrder'
      ).and.returnValue(of({} as Order));
      const spyOrderServiceGet = spyOn(
        component.orderService,
        'getOrders'
      ).and.returnValue(of({ orders: [] }));
      const spyDispatcher = spyOn(component.store, 'dispatch');

      component.removeAmountHandler(2, '');

      expect(spyOrderServiceUpdate).toHaveBeenCalled();
      expect(spyOrderServiceGet).toHaveBeenCalled();
      expect(spyDispatcher).toHaveBeenCalled();
    });

    it('should call to the orderService and store if the amount is bigger than "2"', () => {
      const spyDeleteHandler = spyOn(component, 'deleteItemHandler');

      component.removeAmountHandler(1, '');

      expect(spyDeleteHandler).toHaveBeenCalled();
    });
  });
});
