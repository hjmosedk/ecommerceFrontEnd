import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { newOrderModel } from './models/order.model';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { OrderActions } from './state/order.actions';
import { Ecommerce } from 'ckh-typings';
import { selectOrder } from './state/order.selectors';
import { StripeService } from 'ngx-stripe';
import { tap } from 'rxjs';
import { ProductService } from '../product/product.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUri = environment.baseUri;
  clientSecret: string = 'helloWOrld!';

  constructor(
    private http: HttpClient,
    private store: Store,
    private stripeService: StripeService
  ) {}

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
    console.log('Called! - Get Order Service');
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

  updateOrder(orderId: number, newOrderStatus: Ecommerce.OrderStatus) {
    return this.http.patch<Ecommerce.OrderModel>(
      `${this.baseUri}/orders/${orderId}?status=${newOrderStatus}`,
      {}
    );
  }

  dispatchUpdateOrder(orderId: number, newStatus: Ecommerce.OrderStatus) {
    this.store.dispatch(OrderActions.updateOrderStatus({ orderId, newStatus }));
  }

  getPaymentIntent(
    orderPrice: number,
    orderCurrency: any = Ecommerce.CurrencyType.DKK
  ) {
    return this.http.post<string>(`${this.baseUri}/payment`, {
      orderPrice,
      orderCurrency,
    });
  }

  processPayment(paymentIntent: string | undefined) {
    if (!paymentIntent) {
      return;
    }
    return this.stripeService.confirmCardPayment(paymentIntent);
  }
}
