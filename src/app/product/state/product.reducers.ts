import { createReducer, on, createFeature } from '@ngrx/store';
import { ProductActions } from './product.action';
import { ProductState } from 'src/app/state/app.state';

export const initialState: ProductState = {
  product: undefined,
};

export const productReducer = createReducer<ProductState>(
  initialState,
  on(ProductActions.getProductSuccess, (state, { payload }): ProductState => {
    console.log(payload);
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

export const productFeature = createFeature({
  name: 'product',
  reducer: productReducer,
});

export const { name, reducer, selectProduct, selectProductState } =
  productFeature;
