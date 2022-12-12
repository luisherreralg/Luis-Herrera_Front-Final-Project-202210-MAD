import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ModalHandlerService } from 'src/app/services/modal-handler.service';
import { SneakersService } from 'src/app/services/sneakers.service';
import { AppState } from 'src/app/state/app.state';
import * as actions from 'src/app/state/sneaker.reducer/sneaker.action.creator';
import { ProtoSneaker, Sneaker } from 'src/app/types/sneaker';

@Component({
  selector: 'app-admin-edit-modal',
  templateUrl: './admin-edit-modal.component.html',
})
export class AdminEditModalComponent implements OnInit {
  sneakerId = '';
  postSneaker = false;
  sneaker: Sneaker = {} as Sneaker;

  constructor(
    public modalService: ModalHandlerService,
    public sneakerService: SneakersService,
    public localStorageService: LocalStorageService,
    public store: Store<AppState>
  ) {}

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

  handlePostSneaker() {
    const saveSneaker: Partial<Sneaker> = this.formEditSneaker.value as Sneaker;
    console.log(saveSneaker);
    saveSneaker.size = [];
    saveSneaker.images = [];
    this.sneakerService
      .postSneaker(saveSneaker as ProtoSneaker)
      .subscribe((response) => {
        console.log(response);
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
