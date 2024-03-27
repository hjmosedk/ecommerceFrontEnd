import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatedOrderModel, OrderModel } from './models/order.model';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { OrderActions } from './state/order.actions';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  baseUri = environment.baseUri;
  constructor(private http: HttpClient, private store: Store) {}

  createNewOrder(newOrder: OrderModel) {
    return this.http.post<CreatedOrderModel>(
      `${this.baseUri}/orders`,
      newOrder
    );
  }

  dispatchNewOrder(newOrder: OrderModel) {
    this.store.dispatch(OrderActions.createOrder({ newOrder }));
  }
}
