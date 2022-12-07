import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalHandlerService {
  private subjectLogin = new Subject<boolean>();
  private subjectRegister = new Subject<boolean>();
  private subjectCart = new Subject<boolean>();

  loginModal(value: boolean) {
    this.subjectLogin.next(value);
  }

  getLoginModal() {
    return this.subjectLogin.asObservable();
  }

  registerModal(value: boolean) {
    this.subjectRegister.next(value);
  }

  getRegisterModal() {
    return this.subjectRegister.asObservable();
  }

  cartModal(value: boolean) {
    this.subjectCart.next(value);
  }

  getCartModal() {
    return this.subjectCart.asObservable();
  }
}
