import { Component, Input } from '@angular/core';
import { Product } from 'src/app/product/types/productTypes';
import Dinero, { Currency } from 'dinero.js';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input()
  product: Product = {
    id: '0',
    name: 'Hej med dej',
    sku: 'HMD',
    description: 'THis is an item',
    price: 2500,
    picture: '',
    brand: '',
    quantity: 0,
    percentage: 25,
    onSale: false,
    currency: 'DKK',
  };

  calculatePrice(price: number = 2500, currency: Currency = 'DKK') {
    return Dinero({ amount: price, currency: currency }).toFormat();
  }
}
