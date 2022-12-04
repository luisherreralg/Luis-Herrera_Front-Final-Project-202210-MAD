import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.sate';
import { Sneaker } from '../types/sneaker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  sneakers: Sneaker[] = [];
  constructor(public store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.sneakers = state.sneakers.sneakers;
    });
  }
}