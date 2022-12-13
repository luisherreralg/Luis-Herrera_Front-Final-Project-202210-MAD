import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProtoUser, User } from '../types/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl: string;
  token: string;

  constructor(
    public http: HttpClient,
    public localStorageService: LocalStorageService
  ) {
    (this.apiUrl =
      'https://luis-herrera-back-final-project-202210.onrender.com/users'),
      (this.token = localStorageService.getToken() as string);
  }

  register(user: ProtoUser): Observable<{
    user: User;
  }> {
    return this.http.post(this.apiUrl + '/register', user) as Observable<{
      user: User;
    }>;
  }

  login(loginData: Partial<User>): Observable<{ token: string }> {
    return this.http.post(this.apiUrl + '/login', loginData) as Observable<{
      token: string;
    }>;
  }
}
