import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebLocationService {
  public subjectPath = new Subject<string>();

  changePath(path: string) {
    this.subjectPath.next(path);
  }

  getPath() {
    return this.subjectPath.asObservable();
  }
}
