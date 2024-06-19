import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { throwError } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { OrdersService } from '../orders.service';
import { OrderActions } from './order.actions';
import { OrdersActions } from './orders.actions';
import { Ecommerce } from 'ckh-typings';

@Injectable()
export class OrdersEffect {
  constructor(private actions: Actions, private ordersService: OrdersService) {}

  createNewOrder = createEffect(() => {
    return this.actions.pipe(
      ofType(OrderActions.createOrder),
      switchMap(({ newOrder }) => {
        return this.ordersService.createNewOrder(newOrder).pipe(
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
        return this.ordersService.getOrder(orderId).pipe(
          map((order) => OrderActions.getOrderSuccess({ order })),
          catchError((error) => throwError(() => error))
        );
      })
    );
  });

  listAllOrders = createEffect(() => {
    return this.actions.pipe(
      ofType(OrdersActions.loadOrders),
      switchMap(() => {
        return this.ordersService.getAllOrders().pipe(
          map((orders) => OrdersActions.loadOrdersSuccess({ orders })),
          catchError((error) => throwError(() => error))
        );
      })
    );
  });
}
