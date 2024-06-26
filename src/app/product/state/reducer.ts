import { createReducer, on } from '@ngrx/store';
import { ProductsActions } from './actions';
import { productsAdapter } from './state';

export const productsReducer = createReducer(
  productsAdapter.getInitialState(),
  on(ProductsActions.loadAllProductsSuccess, (state, { products }) =>
    productsAdapter.addMany(products, state)
  ),
  on(ProductsActions.loadProductSuccess, (state, { product }) =>
    productsAdapter.upsertOne(product, state)
  ),
  on(ProductsActions.createProductSuccess, (state, { product }) =>
    productsAdapter.addOne(product, state)
  ),
  on(ProductsActions.updatedProductSuccess, (state, { update }) =>
    productsAdapter.updateOne(update, state)
  )
);
