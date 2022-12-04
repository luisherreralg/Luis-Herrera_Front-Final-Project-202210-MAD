import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SneakersService } from './services/sneakers.service';
import { AppState } from './state/app.sate';
import * as actions from './state/sneaker.reducer/sneaker.action.creator';
import { Sneaker } from './types/sneaker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  sneakers: Sneaker[] = [];

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
