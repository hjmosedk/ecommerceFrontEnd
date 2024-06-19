import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from './order.state';

const selectOrderFeature = createFeatureSelector<OrderState>('order');

export const selectOrder = createSelector(
  selectOrderFeature,
  (state: OrderState) => state.order
);
