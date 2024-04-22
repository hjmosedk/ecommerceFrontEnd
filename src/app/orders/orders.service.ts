import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderModel } from './models/order.model';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { OrderActions } from './state/order.actions';
import { Ecommerce } from 'ckh-typings';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  baseUri = environment.baseUri;
  constructor(private http: HttpClient, private store: Store) {}

  createNewOrder(newOrder: OrderModel) {
    return this.http.post<Ecommerce.OrderModel>(
      `${this.baseUri}/orders`,
      newOrder
    );
  }

  dispatchNewOrder(newOrder: OrderModel) {
    this.store.dispatch(OrderActions.createOrder({ newOrder }));
  }
}
