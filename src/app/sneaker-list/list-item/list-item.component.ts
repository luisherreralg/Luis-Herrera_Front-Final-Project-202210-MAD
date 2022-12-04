import { Component, Input } from '@angular/core';
import { Sneaker } from 'src/app/types/sneaker';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
})
export class ListItemComponent {
  @Input() sneaker: Sneaker = {
    id: 'Initial',
    brand: 'Initial',
    model: 'Initial',
    size: [],
    price: 0,
    onSalePrice: 0,
    onSale: false,
    stock: 0,
    gender: 'Initial',
    images: [],
  };
}
