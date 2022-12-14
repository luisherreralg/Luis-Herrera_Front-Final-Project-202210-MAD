import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, ProtoOrder } from '../types/order';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  apiUrl: string;
  constructor(
    public storageService: LocalStorageService,
    public http: HttpClient
  ) {
    this.apiUrl = 'http://localhost:7700/orders';
  }

  getOrders(): Observable<{ orders: Order[] }> {
    const httpOptions = {
      method: 'GET',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.storageService.getToken(),
      }),
    };

    return this.http.get(
      this.apiUrl + '/cart',
      httpOptions
    ) as unknown as Observable<{
      orders: Order[];
    }>;
  }

  postOrder(newOrder: ProtoOrder, sneakerId: string): Observable<Order> {
    const httpOptions = {
      method: 'GET',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.storageService.getToken(),
      }),
    };

    return this.http.post(
      this.apiUrl + '/newOrder/' + sneakerId,
      newOrder,
      httpOptions
    ) as unknown as Observable<Order>;
  }

  updateOrder(
    updatedOrder: Partial<Order>,
    sneakerId: string
  ): Observable<Order> {
    const httpOptions = {
      method: 'PATCH',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.storageService.getToken(),
      }),
    };

    return this.http.patch(
      this.apiUrl + '/updateOrder/' + sneakerId,
      updatedOrder,
      httpOptions
    ) as unknown as Observable<Order>;
  }

  deleteOrder(sneakerId: string): Observable<Order> {
    const httpOptions = {
      method: 'DELETE',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.storageService.getToken(),
      }),
    };

    return this.http.delete(
      this.apiUrl + '/delete/' + sneakerId,
      httpOptions
    ) as unknown as Observable<Order>;
  }
}
