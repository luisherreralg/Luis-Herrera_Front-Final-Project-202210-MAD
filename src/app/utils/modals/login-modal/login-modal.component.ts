import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { timeout } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
})
export class LoginModalComponent {
  @Output() handlerLoginModal: EventEmitter<void> = new EventEmitter();

  errorStatus = false;

  constructor(
    public userService: UsersService,
    public storageService: LocalStorageService
  ) {}

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  loginHandler() {
    if (this.formLogin.valid) {
      this.userService
        .login(this.formLogin.value as Partial<User>)
        .subscribe((res) => {
          // if (!res.token) {
          //   this.errorStatus = true;
          //   return;
          // }
          this.storageService.saveToken(res.token);
          return this.handlerLoginModalEvent();
        });
    }

    this.errorStatus = true;
    setTimeout(() => {
      this.errorStatus = false;
    }, 3000);
  }

  handlerLoginModalEvent() {
    this.handlerLoginModal.emit();
  }
}
