import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SneakersService } from '../services/sneakers.service';
import { Sizes, Sneaker } from '../types/sneaker';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent {
  id!: string;
  sneaker: Sneaker = {
    id: '',
    brand: '',
    model: '',
    size: [],
    price: 0,
    onSalePrice: 0,
    onSale: false,
    stock: 0,
    gender: '',
    images: ['', ''],
  };

  constructor(public route: ActivatedRoute, public service: SneakersService) {}

  ngOnInit() {
    // Para sacar el queryparam
    this.id = this.route.snapshot.paramMap.get('id') as string;

    this.service.getSneaker(this.id).subscribe((data) => {
      this.sneaker = data.sneaker;
    });
  }
}
