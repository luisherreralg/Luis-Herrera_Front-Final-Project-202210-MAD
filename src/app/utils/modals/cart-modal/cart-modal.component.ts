import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/types/order';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
})
export class CartModalComponent implements OnInit {
  @Output() handlerCartModal: EventEmitter<void> = new EventEmitter();
  orders: Order[] = [];

  constructor(public orderService: OrdersService) {}

  handlerLoginModalEvent() {
    this.handlerCartModal.emit();
  }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((resp) => {
      this.orders = resp.orders;
      console.log(
        '🚀 ~ file: cart-modal.component.ts:22 ~ CartModalComponent ~ this.orderService.getOrders ~ this.orders',
        this.orders
      );
    });
  }
}
