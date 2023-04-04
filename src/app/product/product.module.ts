import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductCardComponent } from './product-card/product-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { AllProductsComponent } from './all-products/all-products.component';
import { StoreModule } from '@ngrx/store';
import { productsFeature } from './state/all-products.reducers';
import { productFeature } from './state/product.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './state/product.effect';
import { AllProductsEffects } from './state/all-products.effect';
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
    StoreModule.forFeature(productsFeature),
    StoreModule.forFeature(productFeature),
    EffectsModule.forFeature([AllProductsEffects, ProductEffects]),
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
