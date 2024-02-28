import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { CartItemModel } from '../models/cartItem.model';

export interface CartState extends EntityState<CartItemModel> {}

export const cartAdapter = createEntityAdapter<CartItemModel>({
  selectId: (product) => product.id,
});
