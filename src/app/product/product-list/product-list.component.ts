import { Component, Input, OnInit } from '@angular/core';
import { selectAllProducts, selectOneProduct } from '../state/selectors';
import { Store } from '@ngrx/store';
import Dinero, { Currency } from 'dinero.js';
import { ProductsActions } from '../state/actions';
import { environment } from 'src/environments/environment';

import { ProductModel } from 'src/app/shared/models/product.model';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProductModalComponent } from '../update-product-modal/update-product-modal.component';
import { UpdateProductModel } from '../models/updateProduct.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  baseUrl = environment.baseUri;
  imagePath = environment.imagePath;
  selectedProduct$: Observable<ProductModel | undefined> =
    new Observable<undefined>();
  product: ProductModel | undefined = undefined;
  formData: UpdateProductModel | undefined;
  @Input() updatedProduct: ProductModel | undefined;

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
    this.selectedProduct$.subscribe((product) => (this.product = product));
    if (this.product) {
      const updateFunction = this.onUpdatedProduct;
      this.formData = {
        product: this.product,
        uri: this.baseUrl,
        onUpdatedProduct: updateFunction,
        imgString: `${this.baseUrl}/images/${this.product.image}`,
      };
      this.dialog.open(UpdateProductModalComponent, {
        data: this.formData,
      });
    }
  }

  onUpdatedProduct(product: ProductModel) {
    console.log(product);
  }
}
