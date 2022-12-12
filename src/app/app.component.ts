import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ModalHandlerService } from './services/modal-handler.service';
import { SneakersService } from './services/sneakers.service';
import { WebLocationService } from './services/web-location.service';
import { AppState } from './state/app.state';
import * as actions from './state/sneaker.reducer/sneaker.action.creator';
import { Sneaker } from './types/sneaker';

// ! IMPORTACION DE FIREBASE
import {
  Storage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from '@angular/fire/storage';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  // ! FIREBASE
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uploadImage($event: any) {
    const file = $event.target.files[0];
    console.log(file);

    const imgRef = ref(this.storage, 'sneakers/' + file.name);

    uploadBytes(imgRef, file)
      .then((snapshot) => {
        console.log('Uploaded a blob or file!');
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }

  getImages() {
    const imgRef = ref(this.storage, 'sneakers');
    console.log(imgRef);

    listAll(imgRef)
      .then(async (res) => {
        console.log(res);

        for (const item of res.items) {
          const url = await getDownloadURL(item);
          console.log(url);
        }
      })
      .catch((error) => console.log(error));
  }

  // ? FIREBASE

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
    public pathService: WebLocationService,
    public storage: Storage
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
