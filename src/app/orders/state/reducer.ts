import { createReducer, on } from '@ngrx/store';
import { cartAdapter } from './state';
import { CartActions } from './actions';

export const cartReducer = createReducer(
  cartAdapter.getInitialState(),
  on(CartActions.addToCart, (state, { cartItem }) =>
    cartAdapter.upsertOne(cartItem, state)
  ),
  on(CartActions.updateCart, (state, { id, quantity }) => {
    return cartAdapter.updateOne(
      { id: id, changes: { salesQuantity: quantity } },
      state
    );
  }),
  on(CartActions.removeFromCart, (state, { id }) =>
    cartAdapter.removeOne(id, state)
  ),
  on(CartActions.clearCart, (state) => cartAdapter.removeAll(state))
);
