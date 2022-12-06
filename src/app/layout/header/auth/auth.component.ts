import { Component } from '@angular/core';
import { ModalHandlerService } from 'src/app/services/modal-handler.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  constructor(private modalService: ModalHandlerService) {}

  handlerLoginModal() {
    this.modalService.loginModal(true);
  }
}
