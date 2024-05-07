import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState, orderAdapter } from './order.state';

const selectOrdersFeature = createFeatureSelector<OrderState>('order');

export const ordersSelectors = orderAdapter.getSelectors();

export const selectOrderEntities = createSelector(
  selectOrdersFeature,
  ordersSelectors.selectEntities
);

export const selectOrder = createSelector(
  selectOrdersFeature,
  ordersSelectors.selectAll
);
