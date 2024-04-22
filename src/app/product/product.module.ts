import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsRoutingModule } from './products-routing.module';

import { MatSelectModule } from '@angular/material/select';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductComponent } from './product/product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductListComponent } from './product-list/product-list.component';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductFormComponent } from './product-form/product-form.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ProductsEffects } from './state/effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { productsReducer } from './state/reducer';
import { UpdateProductModalComponent } from './update-product-modal/update-product-modal.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    ProductCardComponent,
    AllProductsComponent,
    ProductComponent,
    CreateProductComponent,
    ProductListComponent,
    ProductFormComponent,
    FileUploadComponent,
    UpdateProductModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatGridListModule,
    MatTableModule,
    FlexLayoutModule,
    MatPaginatorModule,
    ProductsRoutingModule,
    EffectsModule.forFeature([ProductsEffects]),
    StoreModule.forFeature('products', productsReducer),
  ],
  exports: [
    BrowserAnimationsModule,
    ProductCardComponent,
    AllProductsComponent,
    CreateProductComponent,
    ProductFormComponent,
    FileUploadComponent,
  ],
})
export class ProductModule {}
