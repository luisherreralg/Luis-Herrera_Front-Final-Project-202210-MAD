import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalHandlerService {
  public subjectLogin = new Subject<boolean>();
  public subjectRegister = new Subject<boolean>();
  public subjectCart = new Subject<boolean>();
  public subjectAdminEdit = new Subject<boolean>();

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

  adminEditModal(value: boolean) {
    this.subjectAdminEdit.next(value);
  }

  getAdminEditModal() {
    return this.subjectAdminEdit.asObservable();
  }
}
