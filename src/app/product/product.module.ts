import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [CarouselComponent],
  imports: [CommonModule, SharedComponentsModule, BrowserAnimationsModule],
  exports: [CarouselComponent, BrowserAnimationsModule],
})
export class ProductModule {}
