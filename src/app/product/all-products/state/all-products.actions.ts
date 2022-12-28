import { createActionGroup, props } from '@ngrx/store';
import { AllProductsState } from './all-products';

export const ProductsActions = createActionGroup({
  source: 'Products',
  events: {
    get_All_Products: props,
    get_All_Product_Success: props<{ payload: AllProductsState }>(),
    get_All_Product_Error: props<{ payload: AllProductsState }>(),
  },
});
