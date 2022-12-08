import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrdersService } from 'src/app/services/orders.service';
import { AppState } from 'src/app/state/app.state';
import * as actions from 'src/app/state/order.reducer/order.action.creator';
import { Order } from 'src/app/types/order';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
})
export class CartListComponent implements OnInit {
  orders: Order[] = [];
  constructor(
    public orderService: OrdersService,
    public store: Store<AppState>
  ) {}

  deleteItemHandler(sneakerId: string) {
    this.orderService.deleteOrder(sneakerId).subscribe(() => {
      this.store.dispatch(actions.deleteOrder({ idDelete: sneakerId }));

      this.orderService.getOrders().subscribe((data) => {
        this.orders = data.orders;
        this.store.dispatch(actions.loadOrders({ orders: this.orders }));
      });
    });
  }

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.orders = state.orders.orders;
    });
  }
}
