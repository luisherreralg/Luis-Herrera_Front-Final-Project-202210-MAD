import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SneakersService } from 'src/app/services/sneakers.service';
import { WebLocationService } from 'src/app/services/web-location.service';
import { AppState } from 'src/app/state/app.state';
import * as actions from 'src/app/state/sneaker.reducer/sneaker.action.creator';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  title!: string;

  searchForm = new FormGroup({
    search: new FormControl('', [Validators.required]),
  });

  constructor(
    public sneakerService: SneakersService,
    public store: Store<AppState>,
    public pathService: WebLocationService
  ) {
    this.pathService.getPath().subscribe((path) => {
      this.title = path;
      console.log(
        '🚀 ~ file: search-bar.component.ts:27 ~ SearchBarComponent ~ this.pathService.getPath ~ this.title',
        this.title
      );
    });
  }

  searchHandler() {
    if (
      this.searchForm.value.search === '' ||
      this.searchForm.value.search === null
    ) {
      this.sneakerService.getSneakers().subscribe((data) => {
        let sneakers = data.sneakers;

        switch (this.title) {
          case 'Hombre':
            sneakers = sneakers.filter((sneaker) => {
              return sneaker.gender === 'hombre';
            });
            break;

          case 'Mujer':
            sneakers = sneakers.filter((sneaker) => {
              return sneaker.gender === 'mujer';
            });
            break;

          case 'onSale':
            sneakers = sneakers.filter((sneaker) => {
              return sneaker.onSale === 'onSale';
            });
            break;

          default:
            break;
        }

        this.store.dispatch(actions.loadSneakers({ sneakers: sneakers }));
      });
      return this.searchForm.reset();
    }

    this.sneakerService
      .searchSneakers(this.searchForm.value.search as string)
      .subscribe((data) => {
        let sneakers = data.sneakers;

        switch (this.title) {
          case 'Hombre':
            sneakers = sneakers.filter((sneaker) => {
              return sneaker.gender === 'hombre';
            });
            break;

          case 'Mujer':
            sneakers = sneakers.filter((sneaker) => {
              return sneaker.gender === 'mujer';
            });
            break;

          case 'onSale':
            sneakers = sneakers.filter((sneaker) => {
              return sneaker.onSale === 'onSale';
            });
            break;

          default:
            break;
        }

        this.store.dispatch(actions.loadSneakers({ sneakers: sneakers }));
      });

    return this.searchForm.reset();
  }
}
