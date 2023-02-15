import { createActionGroup, props } from '@ngrx/store';
import { Product } from '../types/productTypes';

export const ProductActions = createActionGroup({
  source: 'product',
  events: {
    'get Product': props<{ id: string }>(),
    'get Product Success': props<{ payload: Product }>(),
    'get Product Error': props<{ payload: Product }>(),
  },
});
