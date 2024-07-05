import { createReducer, on } from '@ngrx/store';
import { OrdersAdapter } from './orders.state';
import { OrdersActions } from './orders.actions';
import { OrderActions } from './order.actions';

export const ordersReducer = createReducer(
  OrdersAdapter.getInitialState(),
  on(OrdersActions.loadOrdersSuccess, (state, { orders }) =>
    OrdersAdapter.addMany(orders, state)
  ),
  on(OrderActions.updateOrderStatusSuccess, (state, { updatedOrder }) =>
    OrdersAdapter.upsertOne(updatedOrder, state)
  )
);
