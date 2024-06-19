import { createReducer, on } from '@ngrx/store';
import { OrdersAdapter } from './orders.state';
import { OrdersActions } from './orders.actions';

export const ordersReducer = createReducer(
  OrdersAdapter.getInitialState(),
  on(OrdersActions.loadOrdersSuccess, (state, { orders }) =>
    OrdersAdapter.addMany(orders, state)
  )
);
