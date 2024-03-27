import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { throwError } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { OrdersService } from '../orders.service';
import { OrderActions } from './order.actions';

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
}
