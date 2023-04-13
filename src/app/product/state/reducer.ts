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
  )
);
