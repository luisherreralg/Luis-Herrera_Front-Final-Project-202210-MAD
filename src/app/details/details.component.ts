import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../services/orders.service';
import { SneakersService } from '../services/sneakers.service';
import { ProtoOrder } from '../types/order';
import { Sizes, Sneaker } from '../types/sneaker';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit {
  id!: string;
  sneaker: Sneaker = {
    id: '',
    brand: '',
    model: '',
    size: [],
    price: 0,
    onSalePrice: 0,
    onSale: 'notOnSale',
    stock: 0,
    gender: '',
    images: ['', ''],
  };
  selectedSize: Sizes = 'initialValue';

  constructor(
    public route: ActivatedRoute,
    public service: SneakersService,
    public orderService: OrdersService
  ) {}

  selectSize(size: Sizes) {
    this.selectedSize = size as Sizes;
  }

  addCartHandler() {
    this.orderService
      .postOrder({ size: this.selectedSize }, this.sneaker.id)
      .subscribe(() => {
        this.selectedSize = 'initialValue';
      });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') as string;

    this.service.getSneaker(this.id).subscribe((data) => {
      this.sneaker = data.sneaker;
    });
  }
}
