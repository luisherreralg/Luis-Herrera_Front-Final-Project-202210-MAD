import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
})
export class RegisterModalComponent {
  @Output() handlerRegisterModal: EventEmitter<void> = new EventEmitter();

  formRegister = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('user'),
  });

  handlerRegisterModalEvent() {
    this.handlerRegisterModal.emit();
  }
}
