import { Update } from '@ngrx/entity';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { NewProductModel } from 'src/app/shared/models/product.model';
import { Ecommerce } from 'ckh-typings';

export const ProductsActions = createActionGroup({
  source: 'products',
  events: {
    'Load All Products': emptyProps(),
    'Load All Products Success': props<{
      products: Ecommerce.ProductModel[];
    }>(),
    'Load Product': props<{ id: number }>(),
    'Load Product Success': props<{ product: Ecommerce.ProductModel }>(),
    'Create Product': props<NewProductModel>(),
    'Create Product Success': props<{ product: Ecommerce.ProductModel }>(),
    'Update Product': props<{ product: Ecommerce.ProductModel }>(),
    'Updated Product Success': props<{
      update: Update<Ecommerce.ProductModel>;
    }>(),
    'Select Product': props<{ product: Ecommerce.ProductModel }>(),
    'update Status': props<{ id: number }>(),
  },
});
