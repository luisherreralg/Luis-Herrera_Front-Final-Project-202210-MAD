import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
})
export class LoginModalComponent {
  @Output() handlerLoginModal: EventEmitter<void> = new EventEmitter();

  handlerLoginModalEvent() {
    this.handlerLoginModal.emit();
  }
}
