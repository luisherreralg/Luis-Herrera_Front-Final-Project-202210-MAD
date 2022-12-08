import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SneakersService } from 'src/app/services/sneakers.service';
import { AppState } from 'src/app/state/app.state';
import * as actions from 'src/app/state/sneaker.reducer/sneaker.action.creator';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  searchForm = new FormGroup({
    search: new FormControl('', [Validators.required]),
  });

  constructor(
    public sneakerService: SneakersService,
    public store: Store<AppState>
  ) {}

  searchHandler() {
    if (
      this.searchForm.value.search === '' ||
      this.searchForm.value.search === null
    ) {
      this.sneakerService.getSneakers().subscribe((data) => {
        this.store.dispatch(actions.loadSneakers({ sneakers: data.sneakers }));
      });
      return this.searchForm.reset();
    }

    this.sneakerService
      .searchSneakers(this.searchForm.value.search as string)
      .subscribe((data) => {
        this.store.dispatch(actions.loadSneakers({ sneakers: data.sneakers }));
      });

    return this.searchForm.reset();
  }
}
