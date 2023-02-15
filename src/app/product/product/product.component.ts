import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../types/productTypes';
import { selectProduct } from '../state/product.reducers';
import { ActivatedRoute } from '@angular/router';
import { ProductActions } from '../state/product.action';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  public product$: Observable<{} | Product> = this.store.select(selectProduct);
  id: string | null = '1';
  constructor(private store: Store, private route: ActivatedRoute) {}

  getUrlParam(): string | null {
    return (this.id = this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getUrlParam();
    const id = !this.id ? '0' : this.id;
    this.store.dispatch(ProductActions.getProduct({ id }));
  }
}
