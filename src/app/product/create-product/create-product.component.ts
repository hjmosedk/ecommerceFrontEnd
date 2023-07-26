import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import {
  CurrencyEnum,
  ProductModel,
} from 'src/app/shared/models/product.model';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../state/actions';
import { v4 as uuid } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  @Input() product: ProductModel | undefined = undefined;
  baseUri = environment.baseUri;
  constructor(private store: Store) {}

  onProductAdded(product: ProductModel) {
    this.store.dispatch(ProductsActions.createProduct(product));
  }
}
