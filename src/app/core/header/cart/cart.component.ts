import { Component } from '@angular/core';
import { ModalHandlerService } from 'src/app/services/modal-handler.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent {
  constructor(private modalService: ModalHandlerService) {}

  handlerCartModal() {
    this.modalService.cartModal(true);
  }
}
