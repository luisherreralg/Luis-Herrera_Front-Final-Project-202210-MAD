import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SneakersService } from 'src/app/services/sneakers.service';
import { AppState } from 'src/app/state/app.state';
import * as actions from 'src/app/state/sneaker.reducer/sneaker.action.creator';
import { Sneaker } from 'src/app/types/sneaker';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
})
export class AdminListComponent implements OnInit {
  sneakers: Sneaker[] = [];

  preDeleteModal = false;

  constructor(
    public sneakerServices: SneakersService,
    public store: Store<AppState>
  ) {}

  handleDeleteSneaker = (id: string) => {
    this.sneakerServices.deleteSneaker(id).subscribe(() => {
      this.sneakers = this.sneakers.filter((sneaker) => sneaker.id !== id);
      this.store.dispatch(actions.loadSneakers({ sneakers: this.sneakers }));
    });
  };

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.sneakers = state.sneakers.sneakers;
    });

    this.sneakerServices.getSneakers().subscribe((data) => {
      this.sneakers = data.sneakers;
      this.store.dispatch(actions.loadSneakers({ sneakers: this.sneakers }));
    });
  }
}
