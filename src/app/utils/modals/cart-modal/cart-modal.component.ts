import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrdersService } from 'src/app/services/orders.service';
import { AppState } from 'src/app/state/app.state';
import * as actions from 'src/app/state/order.reducer/order.action.creator';
import { Order } from 'src/app/types/order';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
})
export class CartModalComponent implements OnInit {
  @Output() handlerCartModal: EventEmitter<void> = new EventEmitter();
  orders: Order[] = [];
  totalPrice!: number;

  constructor(
    public orderService: OrdersService,
    public store: Store<AppState>
  ) {}

  handlerLoginModalEvent() {
    this.handlerCartModal.emit();
  }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((data) => {
      this.orders = data.orders;
      this.store.dispatch(actions.loadOrders({ orders: this.orders }));
    });

    this.store.select('orders').subscribe((data) => {
      this.totalPrice = data.orders.reduce((acc, order) => {
        return acc + order.amount * order.cartedItem.price;
      }, 0);
    });
  }
}
