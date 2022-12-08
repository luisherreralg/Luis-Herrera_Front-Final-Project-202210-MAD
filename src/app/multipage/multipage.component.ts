import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { SneakersService } from '../services/sneakers.service';
import { AppState } from '../state/app.state';
import * as actions from '../state/sneaker.reducer/sneaker.action.creator';
import { Sneaker } from '../types/sneaker';

@Component({
  selector: 'app-multipage',
  templateUrl: './multipage.component.html',
})
export class MultipageComponent implements OnInit {
  title!: string;
  sneakers: Sneaker[] = [];

  constructor(
    public route: ActivatedRoute,
    public service: SneakersService,
    public store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.subscribe((state) => {
      this.sneakers = state.sneakers.sneakers;
    });

    this.route.params.subscribe((params) => {
      this.title = params['title'];
      this.title = this.title.charAt(0).toUpperCase() + this.title?.slice(1);

      this.service.searchSneakers(this.title).subscribe((data) => {
        this.sneakers = data.sneakers;
        this.store.dispatch(actions.loadSneakers({ sneakers: this.sneakers }));
      });

      // this.store.subscribe((state) => {
      //   const filteredState = state.sneakers.sneakers.filter((sneaker) => {
      //     return sneaker.gender.includes(this.title);
      //   });
      //   this.sneakers = filteredState;
      // });
    });
  }
}
