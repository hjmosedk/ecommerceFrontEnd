import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsActions } from './all-products.actions';
import { ProductService } from '../../product.service';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap, map } from 'rxjs/operators';
import { Product } from '../../types/productTypes';

@Injectable()
export class AllProductsEffects {
  constructor(
    private actions: Actions,
    private productsService: ProductService
  ) {}

  getAllProducts = createEffect(() => {
    return this.actions.pipe(
      ofType(ProductsActions.get_all_products),
      mergeMap(() =>
        this.productsService.getAllProducts().pipe(
          map(
            (data: Product[]) =>
              ProductsActions.get_all_product_success({
                payload: data,
              }),
            catchError((error) =>
              of(
                ProductsActions.get_all_product_error({
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
