import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '../services/local-storage.service';
import { ModalHandlerService } from '../services/modal-handler.service';
import { OrdersService } from '../services/orders.service';
import { SneakersService } from '../services/sneakers.service';
import { AppState } from '../state/app.state';
import * as actions from '../state/order.reducer/order.action.creator';
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

  focusedImage = this.sneaker.images[0];
  restOfImages = this.sneaker.images.slice(1);

  constructor(
    public route: ActivatedRoute,
    public service: SneakersService,
    public orderService: OrdersService,
    public store: Store<AppState>,
    public storageService: LocalStorageService,
    public modalService: ModalHandlerService
  ) {}

  selectSize(size: Sizes) {
    this.selectedSize = size;
  }

  addCartHandler() {
    if (this.storageService.getToken() === null) {
      this.modalService.loginModal(true);
      return;
    }

    if (this.selectedSize === 'initialValue') {
      return;
    }

    this.orderService
      .postOrder({ size: this.selectedSize, amount: 1 }, this.sneaker.id)
      .subscribe(() => {
        this.selectedSize = 'initialValue';
        this.orderService.getOrders().subscribe((data) => {
          this.store.dispatch(actions.loadOrders({ orders: data.orders }));
        });
      });
  }

  nextImageHandler() {
    this.restOfImages = [...this.restOfImages, this.focusedImage];
    this.focusedImage = this.restOfImages[0];
    this.restOfImages = this.restOfImages.slice(1);
  }

  prevImageHandler() {
    this.restOfImages = [this.focusedImage, ...this.restOfImages];
    this.focusedImage = this.restOfImages[this.restOfImages.length - 1];
    this.restOfImages = this.restOfImages.slice(0, -1);
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') as string;

    this.service.getSneaker(this.id).subscribe((data) => {
      this.sneaker = data.sneaker;
      this.focusedImage = this.sneaker.images[0];
      this.restOfImages = this.sneaker.images.slice(1);
    });
  }
}
