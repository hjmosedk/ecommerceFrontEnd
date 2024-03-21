import { Injectable } from '@angular/core';
import Dinero, { Currency } from 'dinero.js';
import { DineroModel } from '../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  constructor() {}

  calculatePrice(price: number = 2500, currency: Currency) {
    return Dinero({ amount: price, currency: currency });
  }

  multiplyPrice(price: DineroModel, multiplier: number) {
    return price.multiply(multiplier);
  }
}
