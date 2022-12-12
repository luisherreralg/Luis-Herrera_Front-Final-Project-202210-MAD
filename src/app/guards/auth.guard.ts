/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  user: User = {} as User;
  constructor(
    public localStorageService: LocalStorageService,
    public router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.user = this.localStorageService.checkTokenRole(
      this.localStorageService.getToken() as string
    );

    if (this.user.role === 'admin') return true;
    return this.router.navigate(['/']);
  }
}
