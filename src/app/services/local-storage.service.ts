import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  saveToken(token: string) {
    return localStorage.setItem('token', token);
  }

  deleteToken() {
    return localStorage.removeItem('token');
  }

  getToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    return token;
  }
}
