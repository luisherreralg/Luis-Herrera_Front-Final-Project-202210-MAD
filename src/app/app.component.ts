import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ModalHandlerService } from './services/modal-handler.service';
import { SneakersService } from './services/sneakers.service';
import { AppState } from './state/app.sate';
import * as actions from './state/sneaker.reducer/sneaker.action.creator';
import { Sneaker } from './types/sneaker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  sneakers: Sneaker[] = [];

  subscription: Subscription;

  loginModal = false;
  registerModal = false;

  constructor(
    public store: Store<AppState>,
    public sneakerService: SneakersService,
    public modalService: ModalHandlerService
  ) {
    this.subscription = this.modalService.getLoginModal().subscribe((value) => {
      this.loginModal = value;
    });

    this.subscription = this.modalService
      .getRegisterModal()
      .subscribe((value) => {
        this.registerModal = value;
      });
  }

  handlerLoginModal() {
    this.loginModal = !this.loginModal;
    this.modalService.loginModal(this.loginModal);
  }

  handlerRegisterModal() {
    this.registerModal = !this.registerModal;
    this.modalService.registerModal(this.registerModal);
  }

  ngOnInit(): void {
    this.sneakerService.getSneakers().subscribe((data) => {
      this.sneakers = data.sneakers;
      this.store.dispatch(actions.loadSneakers({ sneakers: this.sneakers }));
    });
  }
}
