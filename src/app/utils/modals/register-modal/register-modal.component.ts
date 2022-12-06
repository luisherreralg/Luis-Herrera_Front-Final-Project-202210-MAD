import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
})
export class RegisterModalComponent {
  @Output() handlerRegisterModal: EventEmitter<void> = new EventEmitter();

  handlerRegisterModalEvent() {
    this.handlerRegisterModal.emit();
  }
}
