import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ModalHandlerService } from './services/modal-handler.service';
import { SneakersService } from './services/sneakers.service';
import { WebLocationService } from './services/web-location.service';
import { AppState } from './state/app.state';
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
  cartModal = false;
  adminEditModal = false;

  isScrolled = false;

  path!: string;

  constructor(
    public store: Store<AppState>,
    public sneakerService: SneakersService,
    public modalService: ModalHandlerService,
    public pathService: WebLocationService
  ) {
    this.subscription = this.modalService.getLoginModal().subscribe((value) => {
      this.loginModal = value;
    });

    this.subscription = this.modalService
      .getRegisterModal()
      .subscribe((value) => {
        this.registerModal = value;
      });

    this.subscription = this.modalService.getCartModal().subscribe((value) => {
      this.cartModal = value;
    });

    this.subscription = this.pathService.getPath().subscribe((value) => {
      this.path = value;
    });

    this.subscription = this.modalService
      .getAdminEditModal()
      .subscribe((value) => {
        this.adminEditModal = value;
      });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const number =
      document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 260) {
      this.isScrolled = true;
    }
    if (number < 260) {
      this.isScrolled = false;
    }
  }

  ngOnInit(): void {
    this.sneakerService.getSneakers().subscribe((data) => {
      this.sneakers = data.sneakers;
      this.store.dispatch(actions.loadSneakers({ sneakers: this.sneakers }));
    });
  }
}
