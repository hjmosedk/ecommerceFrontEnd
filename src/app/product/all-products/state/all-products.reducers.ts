import { Action, createReducer, on } from '@ngrx/store';
import { ProductsActions } from './all-products.actions';
import { AllProductsState } from './all-products';

export const initialState: AllProductsState = {
  products: [],
};

export const allProductsReducer = createReducer<AllProductsState>(
  initialState,
  on(
    ProductsActions.get_all_product_success,
    (state, { payload }): AllProductsState => {
      return { products: payload.products };
    }
  ),
  on(
    ProductsActions.get_all_product_error,
    (state, { payload }): AllProductsState => {
      return { products: payload.products };
    }
  )
);

export const reducer = (state: any, action: Action) => {
  return allProductsReducer(state, action);
};
