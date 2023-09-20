import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productsAdapter, ProductsState } from './state';
import { entries } from 'cypress/types/lodash';
import { ProductModel } from 'src/app/shared/models/product.model';

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

export const selectActiveProducts = createSelector(
  selectAllProducts,
  (entries: ProductModel[]) => {
    return entries.filter(
      (entity) => entity.isPublic === true && entity.quantity > 0
    );
  }
);
