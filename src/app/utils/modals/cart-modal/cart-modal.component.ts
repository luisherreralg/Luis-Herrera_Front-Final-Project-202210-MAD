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
  paymentHandler: any = null;

  orders: Order[] = [];
  totalPrice!: number;

  constructor(
    public orderService: OrdersService,
    public store: Store<AppState>
  ) {}

  handlerLoginModalEvent() {
    this.handlerCartModal.emit();
  }

  initializePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MCt1qDJ11wdXcrRVZsbJThCSedIFdM3PZ2yMOTqvOEYv4krrtJ7xHFHWuLdPyl9bFrutuiHgOc1sKZKnBm9YOGb00D42yzQH2',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log({ stripeToken });
        alert('Stripe token generated!');
      },
    });

    paymentHandler.open({
      name: 'Disi Sneakers',
      description: 'Payment for your order',
      amount: amount * 100,
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51MCt1qDJ11wdXcrRVZsbJThCSedIFdM3PZ2yMOTqvOEYv4krrtJ7xHFHWuLdPyl9bFrutuiHgOc1sKZKnBm9YOGb00D42yzQH2',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
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
    });
  }
}
