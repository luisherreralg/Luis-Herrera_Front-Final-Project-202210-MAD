import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ModalHandlerService } from 'src/app/services/modal-handler.service';
import { UsersService } from 'src/app/services/users.service';
import { ProtoUser, User } from 'src/app/types/user';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
})
export class RegisterModalComponent implements OnInit, OnDestroy {
  invalidCredentials = false;
  invalidType = false;

  constructor(
    public userService: UsersService,
    public storageService: LocalStorageService,
    public modalService: ModalHandlerService
  ) {}

  formRegister = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('user'),
  });

  handlerRegisterModalEvent() {
    this.modalService.registerModal(false);
  }

  goToLoginHanlder() {
    this.handlerRegisterModalEvent();
    this.modalService.loginModal(true);
  }

  registerHandler() {
    if (!this.formRegister.valid) {
      this.invalidType = true;
      setTimeout(() => {
        this.invalidType = false;
      }, 3000);
      return;
    }

    this.userService
      .register(this.formRegister.value as ProtoUser)
      .subscribe(() => {
        this.userService
          .login({
            email: this.formRegister.value.email,
            password: this.formRegister.value.password,
          } as Partial<User>)
          .subscribe((res) => {
            this.storageService.saveToken(res.token);
            this.handlerRegisterModalEvent();
            this.destroyBodyClass();
            this.reload();
          })
          .add(() => {
            this.invalidCredentials = true;
            setTimeout(() => {
              this.invalidCredentials = false;
            }, 3000);
          });
      });
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

  /* istanbul ignore next */
  reload = () => window.location.reload();
}
