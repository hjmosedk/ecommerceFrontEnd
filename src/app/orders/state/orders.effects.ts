import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { throwError } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { OrdersService } from '../orders.service';
import { OrdersActions } from './orders.actions';

@Injectable()
export class OrdersEffect {
  constructor(private actions: Actions, private ordersService: OrdersService) {}

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
