import { Component } from '@angular/core';
import { ModalHandlerService } from 'src/app/services/modal-handler.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent {
  constructor(private modalService: ModalHandlerService) {}
  togglecart = false;

  handlerCartModal() {
    this.togglecart = !this.togglecart;
    this.modalService.cartModal(this.togglecart);
  }
}
