import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ProductsActions } from '../state/actions';
import { selectActiveProducts } from '../state/selectors';
import { Observable, Subscription, take } from 'rxjs';
import { ProductModel } from 'src/app/shared/models/product.model';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit, OnDestroy {
  productList$: Observable<ProductModel[]> =
    this.store.select(selectActiveProducts);

  pageSize: number = 25; //! Static value!
  totalProducts: number = 0;
  pagesProducts: ProductModel[] | undefined;
  productsSubscription!: Subscription;

  constructor(
    private store: Store,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  ngOnInit() {
    this.productList$.pipe(take(1)).subscribe((products) => {
      if (!products.length) {
        this.store.dispatch(ProductsActions.loadAllProducts());
      }
    });

    this.productsSubscription = this.productList$.subscribe((products) => {
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

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
}
