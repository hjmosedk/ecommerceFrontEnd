import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap, map } from 'rxjs/operators';
import { Product } from '../types/productTypes';
import { ProductActions } from './product.action';

@Injectable()
export class ProductEffects {
  constructor(
    private actions: Actions,
    private productsService: ProductService
  ) {}

  getProductById = createEffect(() => {
    return this.actions.pipe(
      ofType(ProductActions.getProduct),
      switchMap((action) =>
        this.productsService.getProduct(action.id).pipe(
          map(
            (data: Product) =>
              ProductActions.getProductSuccess({
                payload: data,
              }),
            catchError((error) =>
              of(
                ProductActions.getProductError({
                  payload: error,
                })
              )
            )
          )
        )
      )
    );
  });
}
