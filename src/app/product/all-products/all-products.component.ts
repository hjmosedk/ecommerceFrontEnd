import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../types/productTypes';

import { Observable } from 'rxjs';
import { ProductsActions } from '../state/all-products.actions';
import { selectProductList } from '../state/all-products.reducers';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  productList$: Observable<Product[]> = this.store.select(selectProductList);

  constructor(private store: Store) {}

  image1 = 'assets/images/computer-img.png';
  image2 = 'assets/images/camera-img.png';
  image3 = 'assets/images/laptop-img.png';
  image4 = 'assets/images/mac-img.png';

  carouselContent = [this.image1, this.image2, this.image3, this.image4];

  ngOnInit() {
    this.store.dispatch(ProductsActions.get_all_products());
  }
}
