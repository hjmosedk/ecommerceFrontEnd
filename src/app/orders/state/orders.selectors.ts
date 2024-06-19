import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrdersState, OrdersAdapter } from './orders.state';

const selectOrdersFeature = createFeatureSelector<OrdersState>('orders');

export const ordersSelectors = OrdersAdapter.getSelectors();

export const selectOrderEntities = createSelector(
  selectOrdersFeature,
  ordersSelectors.selectEntities
);

export const selectAllOrdersFromStore = createSelector(
  selectOrdersFeature,
  ordersSelectors.selectAll
);
