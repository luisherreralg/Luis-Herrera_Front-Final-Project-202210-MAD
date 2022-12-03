import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SneakersService } from './services/sneakers.service';
import { AppState } from './state/app.sate';
import * as actions from './state/sneaker.reducer/sneaker.action.creator';
import { ProtoSneaker, Sneaker } from './types/sneaker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Luis-Herrera_Front-Final-Project-202210-MAD';
  sneakers: Sneaker[] = [];
  searchSneakers: Sneaker[] = [];
  sneakerToDelete = '638b1d9a7aa299cea82b5a3b';

  sneakerToPost: ProtoSneaker = {
    brand: 'POST',
    model: 'POST',
    size: [],
    price: 0,
    onSalePrice: 0,
    onSale: false,
    stock: 0,
    gender: 'male',
  };

  constructor(
    public store: Store<AppState>,
    public sneakerService: SneakersService
  ) {}

  ngOnInit(): void {
    this.sneakerService.getSneakers().subscribe((data) => {
      this.sneakers = data.sneakers;
      this.store.dispatch(actions.loadSneakers({ sneakers: this.sneakers }));
    });
  }
}
