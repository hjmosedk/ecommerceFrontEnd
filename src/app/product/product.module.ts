import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductCardComponent } from './product-card/product-card.component';
import { MatCardModule } from '@angular/material/card';
import { AllProductsComponent } from './all-products/all-products.component';
import { StoreModule } from '@ngrx/store';
import { productsFeature } from './all-products/state/all-products.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AllProductsEffects } from './all-products/state/all-products.effect';

@NgModule({
  declarations: [CarouselComponent, ProductCardComponent, AllProductsComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,
    BrowserAnimationsModule,
    MatCardModule,
    StoreModule.forFeature(productsFeature),
    EffectsModule.forFeature([AllProductsEffects]),
  ],
  exports: [
    CarouselComponent,
    BrowserAnimationsModule,
    ProductCardComponent,
    AllProductsComponent,
  ],
})
export class ProductModule {}
