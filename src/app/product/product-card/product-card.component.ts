import { Component, Input } from '@angular/core';
import { ProductModel } from 'src/app/shared/models/product.model';
import { Currency } from 'dinero.js';

import { PriceService } from '../price.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  baseUrl = environment.baseUri;
  imagePath: string = '/images/';
  constructor(private priceService: PriceService) {}

  @Input()
  product!: ProductModel;

  calculatePrice(price: number = 2500, currency: Currency) {
    return this.priceService.calculatePrice(price, currency);
  }
}
