import { Component, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/product/types/productTypes';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
import { ProductsActions } from './state/all-products.actions';
import { selectListOfAllProducts } from './state/all-products.selectors';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  allProducts$: any;

  constructor(private store: Store) {}

  image1 =
    'https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80';
  image2 =
    'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80';
  image3 =
    'https://images.unsplash.com/photo-1557800634-7bf3c7305596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2001&q=80';
  image4 =
    'https://images.unsplash.com/photo-1551410224-699683e15636?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80';

  //allProduct: Product[] = [];
  carouselContent = [this.image1, this.image2, this.image3, this.image4];

  ngOnInit() {
    this.store.dispatch(ProductsActions.get_all_products());
  }
}
