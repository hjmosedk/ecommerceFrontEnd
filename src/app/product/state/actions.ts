import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product, NewProduct } from '../types/productTypes';

export const ProductsActions = createActionGroup({
  source: 'products',
  events: {
    'Load All Products': emptyProps(),
    'Load All Products Success': props<{ products: Product[] }>(),
    'Load All Products Error': props<{ error: Error }>(),
    'Load Product': props<{ id: string }>(),
    'Load Product Success': props<{ product: Product }>(),
    'Load Product Error': props<{ error: Error }>(),
    'create Product': props<{ product: NewProduct }>(),
    'create Product Success': props<{ product: Product }>(),
    'create Product Error': props<{ error: Error }>(),
  },
});
