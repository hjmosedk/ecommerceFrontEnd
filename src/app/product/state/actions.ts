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
    'Create Product': props<NewProductModel>(),
    'Create Product Success': props<{ product: ProductModel }>(),
    'Update Product': props<ProductModel>(),
    'Updated Product Success': props<ProductModel>(),
  },
});
