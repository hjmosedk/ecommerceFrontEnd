import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ProductsActions } from '../state/actions';
import { selectAllProducts } from '../state/selectors';
import { Observable } from 'rxjs';
import { Product } from '../types/productTypes';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  productList$: Observable<Product[]> = this.store.select(selectAllProducts);
  constructor(private store: Store, private router: Router) {}

  image1 = 'assets/images/computer-img.png';
  image2 = 'assets/images/camera-img.png';
  image3 = 'assets/images/laptop-img.png';
  image4 = 'assets/images/mac-img.png';

  carouselContent = [this.image1, this.image2, this.image3, this.image4];

  ngOnInit() {
    this.store.dispatch(ProductsActions.loadAllProducts());
  }

  onClick(productId: string) {
    this.router.navigate(['/product', productId]);
  }
}
