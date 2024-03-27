import { createReducer, on } from '@ngrx/store';
import { cartAdapter } from './cart.state';
import { CartActions } from './cart.actions';

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
