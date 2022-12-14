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
    this.apiUrl =
      'https://luis-herrera-back-final-project-202210.onrender.com/sneakers';
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

  patchSneaker(sneaker: Partial<Sneaker>): Observable<Sneaker> {
    const httpOptions = {
      method: 'PATCH',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.storageService.getToken(),
      }),
    };

    return this.http.patch(
      this.apiUrl + '/' + sneaker.id,
      sneaker,
      httpOptions
    ) as Observable<Sneaker>;
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

  postSneaker(sneaker: ProtoSneaker): Observable<{ sneaker: Sneaker }> {
    console.log(
      '🚀 ~ file: sneakers.service.ts:71 ~ SneakersService ~ postSneaker ~ sneaker',
      sneaker
    );

    const httpOptions = {
      method: 'POST',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.storageService.getToken(),
      }),
    };

    return this.http.post(this.apiUrl, sneaker, httpOptions) as Observable<{
      sneaker: Sneaker;
    }>;
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
