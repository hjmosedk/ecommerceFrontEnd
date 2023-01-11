import { createActionGroup, props } from '@ngrx/store';
import { Product } from '../../types/productTypes';

export const ProductsActions = createActionGroup({
  source: 'products',
  events: {
    get_All_Products: props,
    get_All_Product_Success: props<{ payload: Product[] }>(),
    get_All_Product_Error: props<{ payload: Product[] }>(),
  },
});
