import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProtoSneaker, Sneaker } from '../types/sneaker';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SneakersService {
  apiUrl: string;
  constructor(
    public http: HttpClient,
    public storageService: LocalStorageService
  ) {
    this.apiUrl = 'http://localhost:7700/sneakers';
  }

  getSneakers(): Observable<{ sneakers: Sneaker[] }> {
    const httpOptions = {
      method: 'GET',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get(this.apiUrl, httpOptions) as unknown as Observable<{
      sneakers: Sneaker[];
    }>;
  }

  getSneaker(id: string): Observable<{ sneaker: Sneaker }> {
    return this.http.get(this.apiUrl + '/' + id) as Observable<{
      sneaker: Sneaker;
    }>;
  }

  searchSneakers(search: string): Observable<{ sneakers: Sneaker[] }> {
    const httpOptions = {
      method: 'GET',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get(
      this.apiUrl + '/search/' + search,
      httpOptions
    ) as unknown as Observable<{
      sneakers: Sneaker[];
    }>;
  }

  postSneaker(sneaker: ProtoSneaker): Observable<Sneaker> {
    const httpOptions = {
      method: 'POST',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.storageService.getToken(),
      }),
    };

    return this.http.post(
      this.apiUrl,
      sneaker,
      httpOptions
    ) as Observable<Sneaker>;
  }

  deleteSneaker(sneakerId: string): Observable<Sneaker> {
    const httpOptions = {
      method: 'DELETE',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.storageService.getToken(),
      }),
    };

    return this.http.delete(
      this.apiUrl + '/' + sneakerId,
      httpOptions
    ) as Observable<Sneaker>;
  }
}
