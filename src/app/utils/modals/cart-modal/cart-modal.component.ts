import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalHandlerService } from 'src/app/services/modal-handler.service';
import { OrdersService } from 'src/app/services/orders.service';
import { AppState } from 'src/app/state/app.state';
import * as actions from 'src/app/state/order.reducer/order.action.creator';
import { Order } from 'src/app/types/order';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
})
export class CartModalComponent implements OnInit {
  paymentHandler: unknown = null;

  orders: Order[] = [];
  totalPrice!: number;

  constructor(
    public orderService: OrdersService,
    public store: Store<AppState>,
    public modalService: ModalHandlerService
  ) {}

  handlerLoginModalEvent() {
    this.modalService.cartModal(false);
  }

  completeOrders() {
    this.orderService.getOrders().subscribe((data) => {
      data.orders.forEach((order: Order) => {
        this.orderService.deleteOrder(order.cartedItem.id).subscribe(() => {
          this.store.dispatch(actions.deleteOrder({ idDelete: order.orderId }));
        });
      });
    });
  }

  ngOnInit(): void {
    this.invokeStripe();

    this.orderService.getOrders().subscribe((data) => {
      this.orders = data.orders;
      this.store.dispatch(actions.loadOrders({ orders: this.orders }));
    });

    this.store.select('orders').subscribe((data) => {
      this.totalPrice = data.orders.reduce((acc, order) => {
        return acc + order.amount * order.cartedItem.price;
      }, 0);

      this.totalPrice = Math.round(this.totalPrice * 100) / 100;
    });
  }

  /* istanbul ignore next */
  initializePayment(amount: number, completeOrders: () => void) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MCt1qDJ11wdXcrRVZsbJThCSedIFdM3PZ2yMOTqvOEYv4krrtJ7xHFHWuLdPyl9bFrutuiHgOc1sKZKnBm9YOGb00D42yzQH2',
      locale: 'auto',
      token: function () {
        alert('Payment has been successfull!');
        completeOrders();
      },
    });

    paymentHandler.open({
      name: 'Disi Sneakers',
      description: 'Payment for your order',
      amount: amount * 100,
    });
  }

  /* istanbul ignore next */
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51MCt1qDJ11wdXcrRVZsbJThCSedIFdM3PZ2yMOTqvOEYv4krrtJ7xHFHWuLdPyl9bFrutuiHgOc1sKZKnBm9YOGb00D42yzQH2',
          locale: 'auto',
          token: function () {
            alert(
              'Compra completada con ??xito!, Te llegar?? un mail con los detalles de tu compra.'
            );
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}
