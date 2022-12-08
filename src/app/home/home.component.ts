import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SneakersService } from '../services/sneakers.service';
import { AppState } from '../state/app.state';
import * as actions from '../state/sneaker.reducer/sneaker.action.creator';
import { Sneaker } from '../types/sneaker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  onSaleSneakers: Sneaker[] = [];
  sneakers: Sneaker[] = [];
  constructor(
    public store: Store<AppState>,
    public sneakerService: SneakersService
  ) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.sneakers = state.sneakers.sneakers;

      if (this.sneakers.length > 0) {
        this.onSaleSneakers = this.sneakers.filter(
          (sneaker) => sneaker.onSale === 'onSale'
        );
      }
    });

    this.sneakerService.getSneakers().subscribe((data) => {
      this.sneakers = data.sneakers;
      this.store.dispatch(actions.loadSneakers({ sneakers: this.sneakers }));
    });
  }
}
