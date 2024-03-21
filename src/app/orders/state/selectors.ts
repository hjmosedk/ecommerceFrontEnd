import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState, cartAdapter } from './state';
import { CartItemModel } from '../models/cartItem.model';
import { Dictionary } from '@ngrx/entity';

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

export const selectCartEntities = createSelector(
  selectCartFeature,
  cartSelectors.selectEntities
);

export const selectCartEntitiesById = (productId: string) =>
  createSelector(
    selectCartEntities,
    (entities: Dictionary<CartItemModel>) => entities[productId]
  );
