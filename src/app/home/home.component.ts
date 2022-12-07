import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { Sneaker } from '../types/sneaker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  onSaleSneakers: Sneaker[] = [];
  sneakers: Sneaker[] = [];
  constructor(public store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.sneakers = state.sneakers.sneakers;
    });

    if (this.sneakers.length > 0) {
      this.onSaleSneakers = this.sneakers.filter(
        (sneaker) => sneaker.onSale === 'onSale'
      );
    }
  }
}
