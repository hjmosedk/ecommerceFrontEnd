import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ProductsActions } from '../state/actions';
import { selectAllProducts } from '../state/selectors';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/app/shared/models/product.model';
import { ViewportScroller } from '@angular/common';
import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  productList$: Observable<ProductModel[]> =
    this.store.select(selectAllProducts);

  pageSize: number = 25; //! Static value!
  totalProducts: number = 0;
  pagesProducts: ProductModel[] | undefined;

  constructor(
    private store: Store,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  ngOnInit() {
    this.store.dispatch(ProductsActions.loadAllProducts());
    this.productList$.subscribe((products) => {
      this.totalProducts = products.length;
      this.pagesProducts = products.slice(0, this.pageSize);
    });
  }

  onClick(productId: string) {
    this.scrollToTop();
    this.router.navigate(['/product', productId]);
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    const startIndex = event.pageIndex * this.pageSize;

    const endIndex = startIndex + this.pageSize;

    this.productList$.subscribe((products) => {
      this.pagesProducts = products.slice(startIndex, endIndex);
    });
  }
}
