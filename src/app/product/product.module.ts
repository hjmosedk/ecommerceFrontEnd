import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductCardComponent } from './product-card/product-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { AllProductsComponent } from './all-products/all-products.component';
import { MessageModule } from '../message/message.module';
import { ProductComponent } from './product/product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CarouselComponent,
    ProductCardComponent,
    AllProductsComponent,
    ProductComponent,
    CreateProductComponent,
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    BrowserAnimationsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    NgxMatFileInputModule,
    MatButtonModule,
    MessageModule,
    MatSelectModule,
  ],
  exports: [
    CarouselComponent,
    BrowserAnimationsModule,
    ProductCardComponent,
    AllProductsComponent,
    CreateProductComponent,
  ],
})
export class ProductModule {}
