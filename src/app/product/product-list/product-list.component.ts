import { Component, OnInit } from '@angular/core';
import { selectAllProducts } from '../state/selectors';
import { Store } from '@ngrx/store';
import Dinero, { Currency } from 'dinero.js';
import { ProductsActions } from '../state/actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  baseUrl = environment.baseUri;
  imagePath = environment.imagePath;

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
}
