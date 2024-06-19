import { createReducer, on } from '@ngrx/store';
import { OrderActions } from './order.actions';

export const initialState = { order: {} };

export const orderReducer = createReducer(
  initialState,
  on(OrderActions.createOrderSuccess, (state, { createdOrder }) => {
    return { ...state, order: createdOrder };
  }),
  on(OrderActions.getOrderSuccess, (state, { order }) => {
    return { ...state, order };
  })
);
