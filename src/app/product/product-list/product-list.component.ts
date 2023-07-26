import { Component, OnInit } from '@angular/core';
import { selectAllProducts, selectOneProduct } from '../state/selectors';
import { Store } from '@ngrx/store';
import Dinero, { Currency } from 'dinero.js';
import { ProductsActions } from '../state/actions';
import { environment } from 'src/environments/environment';
import { MessageActions } from 'src/app/message/state/actions';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  baseUrl = environment.baseUri;
  imagePath = environment.imagePath;
  selectedProduct: ProductModel | undefined;

  constructor(private store: Store) {}

  displayedColumns: string[] = [
    'sku',
    'name',
    'description',
    'category',
    'price',
    'quantity',
    'image',
    'percentage',
    'onSale',
    'edit',
    'inactive',
  ];
  productList$ = this.store.select(selectAllProducts);

  calculatePrice(price: number = 2500, currency: Currency) {
    return Dinero({ amount: price, currency: currency }).toFormat();
  }

  ngOnInit(): void {
    this.store.dispatch(ProductsActions.loadAllProducts());
  }

  onEdit(id: number) {}
}
