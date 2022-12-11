import { Component, Input } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ModalHandlerService } from 'src/app/services/modal-handler.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  @Input() isLogged = false;
  @Input() isAdmin = false;

  constructor(
    private modalService: ModalHandlerService,
    public storageService: LocalStorageService
  ) {}

  handlerLoginModal() {
    this.modalService.loginModal(true);
  }

  handlerRegisterModal() {
    this.modalService.registerModal(true);
  }

  handlerLogout() {
    this.storageService.deleteToken();
    this.reload();
  }

  /* istanbul ignore next */
  reload = () => window.location.reload();
}
