import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productsAdapter, ProductsState } from './state';
import { getRouterSelectors } from '@ngrx/router-store';

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

const { selectRouteParams } = getRouterSelectors();

export const selectSingleProduct = createSelector(
  selectEntities,
  selectRouteParams,
  (entities, { id }) => entities[id]
);
