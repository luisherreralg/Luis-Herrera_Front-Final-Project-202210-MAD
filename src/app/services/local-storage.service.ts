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

  saveSneakerId(id: string) {
    return localStorage.setItem('sneakerId', id);
  }

  getSneakerId() {
    return localStorage.getItem('sneakerId');
  }

  deleteSneakerId() {
    return localStorage.removeItem('sneakerId');
  }

  checkTokenRole(token: string) {
    if (!token) {
      return;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
}
