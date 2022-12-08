import { Component, Input, OnInit } from '@angular/core';
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
  @Input() totalPrice!: number;
  productPrice!: number;
  orders: Order[] = [];

  constructor(
    public orderService: OrdersService,
    public store: Store<AppState>
  ) {}

  calcProductPrice(order: Order) {
    this.productPrice = order.amount * order.cartedItem.price;
    return this.productPrice;
  }

  deleteItemHandler(sneakerId: string) {
    // Importante para poder borrar el último elemento de la lista
    if (this.orders.length === 1) {
      this.orderService.deleteOrder(sneakerId).subscribe(() => {
        this.store.dispatch(actions.deleteOrder({ idDelete: sneakerId }));
        this.store.dispatch(actions.loadOrders({ orders: [] }));
      });
    }

    this.orderService.deleteOrder(sneakerId).subscribe(() => {
      this.store.dispatch(actions.deleteOrder({ idDelete: sneakerId }));

      this.orderService.getOrders().subscribe((data) => {
        this.orders = data.orders;
        this.store.dispatch(actions.loadOrders({ orders: this.orders }));
      });
    });
  }

  addAmountHandler(amount: number, sneakerId: string) {
    const newAmount = amount + 1;

    this.orderService
      .updateOrder({ amount: newAmount }, sneakerId)
      .subscribe(() => {
        this.orderService.getOrders().subscribe((data) => {
          this.orders = data.orders;
          this.store.dispatch(actions.loadOrders({ orders: this.orders }));
        });
      });
  }

  removeAmountHandler(amount: number, sneakerId: string) {
    const newAmount = amount - 1;

    if (newAmount === 0) {
      this.deleteItemHandler(sneakerId);
      return;
    }

    this.orderService
      .updateOrder({ amount: newAmount }, sneakerId)
      .subscribe(() => {
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

    if (typeof this.totalPrice === 'string') {
      this.totalPrice = 0;
    }
  }
}
