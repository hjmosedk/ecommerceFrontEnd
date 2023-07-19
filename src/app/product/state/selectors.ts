import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productsAdapter, ProductsState } from './state';

const selectProductsFeature = createFeatureSelector<ProductsState>('products');

export const selectors = productsAdapter.getSelectors();

export const selectAllProducts = createSelector(
  selectProductsFeature,
  selectors.selectAll
);

export const selectEntities = createSelector(
  selectProductsFeature,
  selectors.selectEntities
);

export const selectOneProduct = (productId: number) =>
  createSelector(selectEntities, (entities) => entities[productId]);
