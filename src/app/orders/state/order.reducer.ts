import { createReducer, on } from '@ngrx/store';
import { orderAdapter } from './order.state';
import { OrderActions } from './order.actions';

export const orderReducer = createReducer(
  orderAdapter.getInitialState(),
  on(OrderActions.createOrderSuccess, (state, { createdOrder }) =>
    orderAdapter.upsertOne(createdOrder, state)
  )
);
