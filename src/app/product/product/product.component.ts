import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { ProductsActions } from '../state/actions';
import { selectOneProduct } from '../state/selectors';
import { Observable } from 'rxjs';
import { Ecommerce } from 'ckh-typings';
import { ProductCardComponent } from '../product-card/product-card.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css'],
    standalone: true,
    imports: [ProductCardComponent, AsyncPipe],
})
export class ProductComponent implements OnInit {
  public product: Observable<Ecommerce.ProductModel | undefined> =
    new Observable<undefined>();
  constructor(private store: Store, private router: ActivatedRoute) {}

  ngOnInit(): void {
    const routeParams = this.router.snapshot.paramMap;
    const productId = Number(routeParams.get('id'));
    this.store.dispatch(ProductsActions.loadProduct({ id: productId }));
    this.product = this.store.select(selectOneProduct(productId));
  }
}
