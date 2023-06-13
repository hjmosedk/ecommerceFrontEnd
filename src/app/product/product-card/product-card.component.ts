import { Component, Input } from '@angular/core';
import { Product } from 'src/app/product/types/productTypes';
import Dinero, { Currency } from 'dinero.js';
import { CurrencyType } from 'src/app/product/types/productTypes';
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
  product: Product = {
    id: '0',
    name: 'Hej med dej',
    sku: 'HMD',
    description: 'THis is an item',
    price: 2500,
    image: '',
    category: '',
    quantity: 0,
    percentage: 25,
    onSale: false,
    currency: CurrencyType.DKK,
  };

  calculatePrice(price: number = 2500, currency: Currency) {
    return this.priceService.calculatePrice(price, currency);
  }

  trimName(name: string) {
    if (name.length > 14) {
      const trimmedName = name.substring(0, 14);
      return trimmedName;
    }

    return name;
  }
}
