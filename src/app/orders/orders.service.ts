import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { newOrderModel } from './models/order.model';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { OrderActions } from './state/order.actions';
import { Ecommerce } from 'ckh-typings';
import { selectOrder, selectOrderEntities } from './state/order.selectors';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  baseUri = environment.baseUri;
  constructor(private http: HttpClient, private store: Store) {}

  createNewOrder(newOrder: newOrderModel) {
    return this.http.post<Ecommerce.OrderModel>(
      `${this.baseUri}/orders`,
      newOrder
    );
  }

  dispatchNewOrder(newOrder: newOrderModel) {
    this.store.dispatch(OrderActions.createOrder({ newOrder }));
  }

  getOrder(orderId: number) {
    return this.http.get<Ecommerce.OrderModel>(
      `${this.baseUri}/orders/${orderId}`
    );
  }

  setCurrentOrder(orderId: number) {
    this.store.dispatch(OrderActions.getOrder({ orderId }));
  }

  getCurrentOrder() {
    return this.store.select(selectOrder);
  }
}
