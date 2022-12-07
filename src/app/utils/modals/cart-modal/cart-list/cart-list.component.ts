import { Component, Input } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/types/order';
import { Sneaker } from 'src/app/types/sneaker';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
})
export class CartListComponent {
  @Input() orders: Order[] = [];

  constructor(public orderService: OrdersService) {}

  deleteItemHandler(sneakerId: string) {
    this.orderService.deleteOrder(sneakerId).subscribe(() => {
      this.orders = this.orders.filter(
        (order) => order.cartedItem.id !== sneakerId
      );
    });
  }
}
