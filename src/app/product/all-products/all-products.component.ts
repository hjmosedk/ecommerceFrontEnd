import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../types/productTypes';

import { Observable } from 'rxjs';
import { ProductsActions } from './state/all-products.actions';
import { selectProductList } from './state/all-products.reducers';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  productList$: Observable<Product[]> = this.store.select(selectProductList);

  constructor(private store: Store) {}

  image1 =
    'https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80';
  image2 =
    'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80';
  image3 =
    'https://images.unsplash.com/photo-1557800634-7bf3c7305596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2001&q=80';
  image4 =
    'https://images.unsplash.com/photo-1551410224-699683e15636?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80';

  carouselContent = [this.image1, this.image2, this.image3, this.image4];

  ngOnInit() {
    this.store.dispatch(ProductsActions.get_all_products());
  }
}
