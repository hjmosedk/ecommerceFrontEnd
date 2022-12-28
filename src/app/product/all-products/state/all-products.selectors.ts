import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { AllProductsState } from './all-products';

export const selectAllProducts = (state: AppState) => state.allProducts;

export const selectListOfAllProducts = createSelector(
  selectAllProducts,
  (state: AllProductsState) => state.products
);
