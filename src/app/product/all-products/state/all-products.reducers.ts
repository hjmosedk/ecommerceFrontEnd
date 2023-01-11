import { Action, createReducer, on, createFeature } from '@ngrx/store';
import { ProductsActions } from './all-products.actions';
import { AppState } from 'src/app/state/app.state';
import { Products } from 'src/app/state/app.state';

export const initialState: Products = {
  product: {},
  productList: [],
};

export const productsReducer = createReducer<Products>(
  initialState,
  on(
    ProductsActions.get_all_product_success,
    (state, { payload }): Products => {
      const newState = { ...state };
      newState.productList = payload;
      return newState;
    }
  ),
  on(
    ProductsActions.get_all_product_error,
    (state, { payload }): Products => ({
      ...state,
    })
  )
);

export const productsFeature = createFeature({
  name: 'products',
  reducer: productsReducer,
});

export const {
  name,
  reducer,
  selectProductList,
  selectProduct,
  selectProductsState,
} = productsFeature;
