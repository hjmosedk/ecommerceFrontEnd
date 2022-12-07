import { Component, Input } from '@angular/core';
import { Product } from 'src/types/productTypes';
import Dinero, { Currency } from 'dinero.js';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input()
  product!: Product;

  calculatePrice(price: number, currency: Currency) {
    return Dinero({ amount: price, currency: currency }).toFormat();
  }
}
