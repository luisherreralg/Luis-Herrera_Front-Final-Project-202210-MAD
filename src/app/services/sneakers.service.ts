import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProtoSneaker, Sneaker } from '../types/sneaker';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SneakersService {
  apiUrl: string;
  constructor(public http: HttpClient) {
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

  postSneaker(sneaker: ProtoSneaker, authToken: string): Observable<Sneaker> {
    return this.http.post(this.apiUrl, sneaker, {
      headers: { Authorization: 'Bearer ' + authToken },
    }) as Observable<Sneaker>;
  }
}
