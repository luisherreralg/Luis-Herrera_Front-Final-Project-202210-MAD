import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    public searchService: SneakersService,
    public store: Store<AppState>
  ) {}

  onInput() {
    this.searchService
      .searchSneakers(this.searchForm.value.search as string)
      .subscribe((data) => {
        this.store.dispatch(actions.loadSneakers({ sneakers: data.sneakers }));
      });

    if (this.searchForm.value.search === '') {
      this.searchService.getSneakers().subscribe((data) => {
        this.store.dispatch(actions.loadSneakers({ sneakers: data.sneakers }));
      });
    }
  }
}
