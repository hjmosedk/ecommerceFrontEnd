import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { ProductsActions } from '../state/actions';
import { selectOneProduct } from '../state/selectors';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/app/shared/models/product.model';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  public product: Observable<ProductModel | undefined> =
    new Observable<undefined>();
  constructor(private store: Store, private router: ActivatedRoute) {}

  ngOnInit(): void {
    const routeParams = this.router.snapshot.paramMap;
    const productId = Number(routeParams.get('id'));
    this.store.dispatch(ProductsActions.loadProduct({ id: productId }));
    this.product = this.store.select(selectOneProduct(productId));
  }
}
