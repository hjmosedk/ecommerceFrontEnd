import { Component, Input } from '@angular/core';

import { Ecommerce } from 'ckh-typings';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../state/actions';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  @Input() product: Ecommerce.ProductModel | undefined = undefined;
  baseUri = environment.baseUri;
  constructor(private store: Store) {}

  onProductAdded(product: Ecommerce.ProductModel) {
    this.store.dispatch(ProductsActions.createProduct(product));
  }
}
