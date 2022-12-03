import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SneakersService } from './services/sneakers.service';
import { AppState } from './state/app.sate';
import * as actions from './state/sneaker.reducer/sneaker.action.creator';
import { ProtoSneaker, Sneaker } from './types/sneaker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Luis-Herrera_Front-Final-Project-202210-MAD';
  sneakers: Sneaker[] = [];
  searchSneakers: Sneaker[] = [];
  sneakerToDelete = '638b1d9a7aa299cea82b5a3b';

  sneakerToPost: ProtoSneaker = {
    brand: 'POST',
    model: 'POST',
    size: [],
    price: 0,
    onSalePrice: 0,
    onSale: false,
    stock: 0,
    gender: 'male',
  };

  constructor(
    public store: Store<AppState>,
    public sneakerService: SneakersService
  ) {}

  ngOnInit(): void {
    // ############################### PRUEBA DE LOS SERVICIOS ###############################
    // this.sneakerService.getSneakers().subscribe((data) => {
    //   this.sneakers = data.sneakers;
    //   this.store.dispatch(actions.loadSneakers({ sneakers: this.sneakers }));
    //   console.log(this.sneakers);
    // });
    // this.sneakerService.searchSneakers('Nike').subscribe((data) => {
    //   this.searchSneakers = data.sneakers;
    //   console.log(this.searchSneakers);
    // });
    // this.sneakerService
    //   .postSneaker(
    //     this.sneakerToPost,
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODhkYzlmOTUxYTc5YzhiYWZiMDU2MyIsIm5hbWUiOiJMdWlzIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY5OTc0OTYxfQ.s0T6RSCkG6qf2OvLFcxcpIBB1CUebyPZqBxB-jh9-wY'
    //   )
    //   .subscribe((data) => {
    //     console.log(data);
    //   });
    // this.sneakerService
    //   .deleteSneaker(
    //     this.sneakerToDelete,
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODhkYzlmOTUxYTc5YzhiYWZiMDU2MyIsIm5hbWUiOiJMdWlzIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY5OTc0OTYxfQ.s0T6RSCkG6qf2OvLFcxcpIBB1CUebyPZqBxB-jh9-wY'
    //   )
    //   .subscribe((data) => {
    //     console.log(data);
    //   });
  }
}
