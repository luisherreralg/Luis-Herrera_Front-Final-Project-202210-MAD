import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalHandlerService {
  private subject = new Subject<boolean>();

  loginModal(value: boolean) {
    this.subject.next(value);
  }

  getLoginModal() {
    return this.subject.asObservable();
  }
}
