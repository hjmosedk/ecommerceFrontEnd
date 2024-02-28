import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState, cartAdapter } from './state';

const selectCartFeature = createFeatureSelector<CartState>('cart');

export const cartSelectors = cartAdapter.getSelectors();

export const selectCartItems = createSelector(
  selectCartFeature,
  cartSelectors.selectAll
);

export const selectCartLength = createSelector(
  selectCartFeature,
  cartSelectors.selectTotal
);
