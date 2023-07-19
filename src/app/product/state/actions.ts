import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  ProductModel,
  NewProductModel,
} from 'src/app/shared/models/product.model';

export const ProductsActions = createActionGroup({
  source: 'products',
  events: {
    'Load All Products': emptyProps(),
    'Load All Products Success': props<{ products: ProductModel[] }>(),
    'Load Product': props<{ id: number }>(),
    'Load Product Success': props<{ product: ProductModel }>(),
    'create Product': props<NewProductModel>(),
    'create Product Success': props<{ product: ProductModel }>(),
  },
});
