import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CartItemModel } from '../models/cartItem.model';

export const CartActions = createActionGroup({
  source: 'cart',
  events: {
    'Add To Cart': props<{ cartItem: CartItemModel }>(),
    'Remove From Cart': props<{ id: string }>(),
    'Clear Cart': emptyProps(),
  },
});
