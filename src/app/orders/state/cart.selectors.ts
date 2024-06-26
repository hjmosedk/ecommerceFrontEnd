import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState, cartAdapter } from './cart.state';
import { CartItemModel } from '../models/cartItem.model';
import { Dictionary } from '@ngrx/entity';
import Dinero from 'dinero.js';
import { Ecommerce } from 'ckh-typings';
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

export const selectCartEntitiesById = (productId: number) =>
  createSelector(
    selectCartEntities,
    (entities: Dictionary<CartItemModel>) => entities[productId]
  );

export const selectTotalPrice = createSelector(
  selectCartItems,
  (items: CartItemModel[]) => {
    let total = Dinero({ amount: 0, currency: Ecommerce.CurrencyType.DKK });

    for (let item of items) {
      let itemTotal = Dinero({
        amount: item.price,
        currency: item.currency,
      }).multiply(item.salesQuantity);
      total = total.add(itemTotal);
    }

    return total;
  }
);
