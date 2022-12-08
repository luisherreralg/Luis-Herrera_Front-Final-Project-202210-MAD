import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Order } from 'src/app/types/order';
import { mockInitialState, mockOrderInitialState } from '../../mocks/mocks';

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

  describe('Given the handlerLoginModalEvent, when its invoked', () => {
    it('should emit an event with the handlerCartModal event emitter', () => {
      const spy = spyOn(component.handlerCartModal, 'emit');

      component.handlerLoginModalEvent();

      expect(spy).toHaveBeenCalled();
    });
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
});
