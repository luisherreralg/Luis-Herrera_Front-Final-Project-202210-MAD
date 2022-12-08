import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
})
export class LoginModalComponent implements OnInit, OnDestroy {
  @Output() handlerLoginModal: EventEmitter<void> = new EventEmitter();
  invalidCredentials = false;
  invalidType = false;

  constructor(
    public userService: UsersService,
    public storageService: LocalStorageService
  ) {}

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  loginHandler() {
    if (!this.formLogin.valid) {
      this.invalidType = true;
      setTimeout(() => {
        this.invalidType = false;
      }, 3000);
      return;
    }

    this.userService
      .login(this.formLogin.value as Partial<User>)
      .subscribe((res) => {
        this.storageService.saveToken(res.token);
        this.handlerLoginModalEvent();
        this.destroyBodyClass();
        this.reload();
      })
      .add(() => {
        this.invalidCredentials = true;
        setTimeout(() => {
          this.invalidCredentials = false;
        }, 3000);
      });
  }

  reload = () => window.location.reload();

  handlerLoginModalEvent() {
    this.handlerLoginModal.emit();
  }

  addBodyClass() {
    const bodyTag = document.body;
    bodyTag.classList.add('overflow-hidden');
  }

  destroyBodyClass() {
    const bodyTag = document.body;
    bodyTag.classList.remove('overflow-hidden');
  }

  ngOnInit(): void {
    this.addBodyClass();
  }

  ngOnDestroy(): void {
    this.destroyBodyClass();
  }
}
