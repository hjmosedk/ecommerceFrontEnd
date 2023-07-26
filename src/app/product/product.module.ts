import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductCardComponent } from './product-card/product-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { AllProductsComponent } from './all-products/all-products.component';
import { MessageModule } from '../message/message.module';
import { ProductComponent } from './product/product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductListComponent } from './product-list/product-list.component';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductFormComponent } from '../product-form/product-form.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  declarations: [
    ProductCardComponent,
    AllProductsComponent,
    ProductComponent,
    CreateProductComponent,
    ProductListComponent,
    ProductFormComponent,
    FileUploadComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    MessageModule,
    MatSelectModule,
    MatGridListModule,
    MatTableModule,
    FlexLayoutModule,
  ],
  exports: [
    BrowserAnimationsModule,
    ProductCardComponent,
    AllProductsComponent,
    CreateProductComponent,
  ],
})
export class ProductModule {}
