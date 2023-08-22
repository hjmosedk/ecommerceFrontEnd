import { Component, OnDestroy, OnInit } from '@angular/core';
import { selectAllProducts, selectOneProduct } from '../state/selectors';
import { Store } from '@ngrx/store';
import Dinero, { Currency } from 'dinero.js';
import { ProductsActions } from '../state/actions';
import { environment } from 'src/environments/environment';

import { ProductModel } from 'src/app/shared/models/product.model';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProductModalComponent } from '../update-product-modal/update-product-modal.component';
import { UpdateProductModel } from '../models/updateProduct.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  baseUrl = environment.baseUri;
  imagePath = environment.imagePath;
  selectedProduct$: Observable<ProductModel | undefined> =
    new Observable<undefined>();
  product: ProductModel | undefined = undefined;
  formData: UpdateProductModel | undefined;
  selectedProductSubscription: Subscription | null = null;

  constructor(private store: Store, private dialog: MatDialog) {}

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

  onEdit(id: number) {
    this.selectedProduct$ = this.store.select(selectOneProduct(id));
    this.selectedProductSubscription = this.selectedProduct$.subscribe(
      (product) => (this.product = product)
    );
    if (this.product) {
      this.formData = {
        product: this.product,
        uri: this.baseUrl,
        onUpdatedProduct: this.onUpdatedProduct,
        imgString: `${this.baseUrl}/images/${this.product.image}`,
      };
      this.dialog.open(UpdateProductModalComponent, {
        data: this.formData,
      });
    }
  }

  onUpdatedProduct = (product: ProductModel) => {
    this.dialog.closeAll();
    const updateProduct = product;
    (updateProduct.id = this.product!.id),
      this.store.dispatch(
        ProductsActions.updateProduct({ product: updateProduct })
      );
  };

  ngOnDestroy(): void {
    if (this.selectedProductSubscription) {
      this.selectedProductSubscription.unsubscribe();
    }
  }
}
