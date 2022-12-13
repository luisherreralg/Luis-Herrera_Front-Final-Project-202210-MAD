import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ModalHandlerService } from 'src/app/services/modal-handler.service';
import { SneakersService } from 'src/app/services/sneakers.service';
import { AppState } from 'src/app/state/app.state';
import * as actions from 'src/app/state/sneaker.reducer/sneaker.action.creator';
import { ProtoSneaker, Sneaker } from 'src/app/types/sneaker';
import {
  Storage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from '@angular/fire/storage';
@Component({
  selector: 'app-admin-edit-modal',
  templateUrl: './admin-edit-modal.component.html',
})
export class AdminEditModalComponent implements OnInit {
  sneakerId = '';
  postSneaker = false;
  postSneakerPhase = 0;
  sneaker: Sneaker = {} as Sneaker;

  constructor(
    public modalService: ModalHandlerService,
    public sneakerService: SneakersService,
    public localStorageService: LocalStorageService,
    public store: Store<AppState>,
    public storage: Storage
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uploadImage($event: any) {
    const file = $event.target.files[0];

    const imgRef = ref(
      this.storage,
      `sneakers/${this.formEditSneaker.value.model}/${file.name}`
    );

    uploadBytes(imgRef, file)
      .then(() => {
        //
      })
      .catch((error) => console.log(error));
  }

  getImages() {
    const urls: string[] = [];
    const imgRef = ref(
      this.storage,
      `sneakers/${this.formEditSneaker.value.model}`
    );

    return listAll(imgRef).then(async (res) => {
      for (const item of res.items) {
        const url = await getDownloadURL(item);
        urls.push(url);
      }
      return urls;
    });
  }

  formEditSneaker = new FormGroup({
    brand: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    onSale: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    onSalePrice: new FormControl(0, [Validators.required]),
    stock: new FormControl(0, [Validators.required]),
    gender: new FormControl('', [Validators.required]),
  });

  handlerAdminEditModalEvent() {
    this.modalService.adminEditModal(false);
  }

  async handlePostSneaker() {
    const saveSneaker: Partial<Sneaker> = this.formEditSneaker.value as Sneaker;
    saveSneaker.size = [];
    saveSneaker.images = await this.getImages();
    console.log(
      '🚀 ~ file: admin-edit-modal.component.ts:89 ~ AdminEditModalComponent ~ handlePostSneaker ~ saveSneaker',
      saveSneaker
    );

    this.sneakerService
      .postSneaker(saveSneaker as ProtoSneaker)
      .subscribe((response) => {
        console.log(
          '🚀 ~ file: admin-edit-modal.component.ts:98 ~ AdminEditModalComponent ~ .subscribe ~ response',
          response
        );
      });

    this.sneakerService
      .postSneaker(saveSneaker as ProtoSneaker)
      .subscribe((response) => {
        console.log(
          '🚀 ~ file: admin-edit-modal.component.ts:98 ~ AdminEditModalComponent ~ .subscribe ~ response',
          response
        );
        this.store.dispatch(
          actions.addSneaker({
            newSneaker: response.sneaker,
          })
        );
        this.localStorageService.deleteSneakerId();
        this.modalService.adminEditModal(false);
      });
  }

  handleEditSneaker() {
    const saveSneaker: Partial<Sneaker> = this.formEditSneaker.value as Sneaker;
    saveSneaker.id = this.sneakerId;
    this.sneakerService.patchSneaker(saveSneaker).subscribe(() => {
      this.store.dispatch(
        actions.editSneaker({
          sneaker: this.formEditSneaker.value as Sneaker,
        })
      );
      this.localStorageService.deleteSneakerId();
      this.modalService.adminEditModal(false);
    });
  }

  ngOnInit(): void {
    this.sneakerId = this.localStorageService.getSneakerId() as string;

    if (this.sneakerId === 'NewSneaker') {
      this.postSneaker = true;
      return;
    }

    this.sneakerService.getSneaker(this.sneakerId).subscribe((data) => {
      this.sneaker = data.sneaker;
      this.formEditSneaker.patchValue({
        brand: this.sneaker.brand,
        model: this.sneaker.model,
        onSale: this.sneaker.onSale,
        price: this.sneaker.price,
        onSalePrice: this.sneaker.onSalePrice,
        stock: this.sneaker.stock,
        gender: this.sneaker.gender,
      });
    });
  }
}
