import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { SneakersService } from '../services/sneakers.service';
import { AppState } from '../state/app.sate';
import { Sneaker } from '../types/sneaker';
// import * as actions from '../state/sneaker.reducer/sneaker.action.creator';

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
    // this.title = this.route.snapshot.paramMap.get('title') as string;
    this.route.params.subscribe((params) => {
      this.title = params['title'];
      this.title = ((this.title.charAt(0).toUpperCase() as string) +
        this.title?.slice(1)) as string;

      this.service.searchSneakers(this.title as string).subscribe((data) => {
        this.sneakers = data.sneakers;
      });

      this.store.subscribe((state) => {
        const filteredState = state.sneakers.sneakers.filter((sneaker) => {
          return sneaker.gender.includes(this.title);
        });
        return (this.sneakers = filteredState);
      });
    });
  }
}
