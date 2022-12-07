import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/types/order';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
})
export class CartListComponent {
  @Input() orders: Order[] = [];

  constructor() {
    console.log(
      '🚀 ~ file: cart-list.component.ts:10 ~ CartListComponent ~ orders',
      this.orders
    );
  }
}
