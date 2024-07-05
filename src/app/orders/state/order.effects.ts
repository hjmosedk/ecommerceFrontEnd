import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { throwError } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { OrderActions } from './order.actions';
import { Ecommerce } from 'ckh-typings';
import { OrderService } from '../order.service';

@Injectable()
export class OrderEffect {
  constructor(private actions: Actions, private orderService: OrderService) {}

  createNewOrder = createEffect(() => {
    return this.actions.pipe(
      ofType(OrderActions.createOrder),
      switchMap(({ newOrder }) => {
        return this.orderService.createNewOrder(newOrder).pipe(
          map((createdOrder) =>
            OrderActions.createOrderSuccess({ createdOrder })
          ),
          catchError((error) => throwError(() => error))
        );
      })
    );
  });

  getCurrentOrder = createEffect(() => {
    return this.actions.pipe(
      ofType(OrderActions.getOrder),
      switchMap(({ orderId }) => {
        return this.orderService.getOrder(orderId).pipe(
          map((order) => OrderActions.getOrderSuccess({ order })),
          catchError((error) => throwError(() => error))
        );
      })
    );
  });

  updateOrderStatus = createEffect(() => {
    return this.actions.pipe(
      ofType(OrderActions.updateOrderStatus),
      switchMap(({ orderId, newStatus }) => {
        return this.orderService.updateOrder(orderId, newStatus).pipe(
          map((updatedOrder) =>
            OrderActions.updateOrderStatusSuccess({ updatedOrder })
          ),
          catchError((error) => throwError(() => error))
        );
      })
    );
  });
}
