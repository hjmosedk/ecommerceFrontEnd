import { Currency, Dinero } from 'dinero.js';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { newOrderModel } from './models/order.model';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { OrderActions } from './state/order.actions';
import { Ecommerce } from 'ckh-typings';
import { selectOrder } from './state/order.selectors';
import { injectStripe, StripeService } from 'ngx-stripe';
import {
  Observable,
  throwError,
  switchMap,
  catchError,
  scheduled,
  asyncScheduler,
} from 'rxjs';
import { ProductService } from '../product/product.service';
import {
  PaymentIntent,
  SetupIntent,
  StripeCardElement,
  StripeElement,
  StripeElements,
} from '@stripe/stripe-js';
import { OrderItemModel } from 'ckh-typings/dist/ecommerce';
import { CartItemModel } from './models/cartItem.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUri = environment.baseUri;

  constructor(private http: HttpClient, private store: Store) {}

  private _stripe = injectStripe(environment.stripe_key);

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

  updateOrder(orderId: number, newOrderStatus: Ecommerce.OrderStatus) {
    return this.http.patch<Ecommerce.OrderModel>(
      `${this.baseUri}/orders/${orderId}?status=${newOrderStatus}`,
      {}
    );
  }

  dispatchUpdateOrder(orderId: number, newStatus: Ecommerce.OrderStatus) {
    this.store.dispatch(OrderActions.updateOrderStatus({ orderId, newStatus }));
  }

  createPaymentIntent(
    orderCurrency: any = Ecommerce.CurrencyType.DKK,
    cartItems: Observable<CartItemModel[]>
  ) {
    return cartItems.pipe(
      switchMap((orderItems) => {
        return this.http.post<PaymentIntent>(`${this.baseUri}/payment`, {
          orderCurrency,
          orderItems: orderItems,
        });
      })
    );
  }

  confirmPayment(elements: StripeElements) {
    if (!elements) {
      return throwError(() => new Error('Client Secret or elements missing'));
    }

    try {
      elements.submit();
      return this._stripe.confirmPayment({ elements, redirect: 'if_required' });
    } catch (error: any) {
      return throwError(() => new Error(`${error.message}`));
    }
  }

  get stripe() {
    return this._stripe;
  }
}
