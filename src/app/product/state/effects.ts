import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsActions } from './actions';
import { ProductService } from '../product.service';

import { throwError } from 'rxjs';
import { catchError, mergeMap, switchMap, map, filter } from 'rxjs/operators';
import { ProductModel } from 'src/app/shared/models/product.model';
import { routerNavigatedAction } from '@ngrx/router-store';
import { error } from 'cypress/types/jquery';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions: Actions,
    private productsService: ProductService
  ) {}

  getAllProducts = createEffect(() => {
    return this.actions.pipe(
      ofType(ProductsActions.loadAllProducts),
      mergeMap(() =>
        this.productsService.getAllProducts().pipe(
          map((products: ProductModel[]) =>
            ProductsActions.loadAllProductsSuccess({
              products,
            })
          ),
          catchError((error) => throwError(() => error))
        )
      )
    );
  });

  /* loadSingleProduct = createEffect(() => {
    return this.actions.pipe(
      ofType(routerNavigatedAction),
      filter(({ payload }) => {
        return payload.event.url.includes('product');
      }),
      mergeMap(({ payload }) => {
        let id = payload.routerState.root.children[0].params['id'];
        if (!id) {
          id = '1';
        }
        return this.productsService.getProduct(id).pipe(
          map((product) => ProductsActions.loadProductSuccess({ product })),
          catchError((error) => throwError(() => error))
        );
      })
    );
  });
*/
  loadSingleProduct = createEffect(() => {
    return this.actions.pipe(
      ofType(ProductsActions.loadProduct),
      switchMap(({ id }) => {
        return this.productsService.getProduct(id).pipe(
          map((product) => ProductsActions.loadProductSuccess({ product })),
          catchError((error) => throwError(() => error))
        );
      })
    );
  });

  createNewProduct = createEffect(() => {
    {
      return this.actions.pipe(
        ofType(ProductsActions.createProduct),
        switchMap((action) => {
          return this.productsService.createProduct(action).pipe(
            map((product) => ProductsActions.createProductSuccess({ product })),
            catchError((error) => throwError(() => error))
          );
        })
      );
    }
  });
}
