import { createReducer, on, createFeature } from '@ngrx/store';
import { ProductActions } from './product.action';
import { ProductState } from 'src/app/state/app.state';

export const initialState: ProductState = {
  product: {},
};

export const productsReducer = createReducer<ProductState>(
  initialState,
  on(ProductActions.getProductSuccess, (state, { payload }): ProductState => {
    const newState = { ...state };
    newState.product = payload;
    return newState;
  }),
  on(
    ProductActions.getProductError,
    (state, { payload }): ProductState => ({
      ...state,
    })
  )
);

export const productsFeature = createFeature({
  name: 'product',
  reducer: productsReducer,
});

export const { name, reducer, selectProduct, selectProductState } =
  productsFeature;
