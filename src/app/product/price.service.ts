import { Injectable } from '@angular/core';
import Dinero, { Currency } from 'dinero.js';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  constructor() {}

  calculatePrice(price: number = 2500, currency: Currency) {
    return Dinero({ amount: price, currency: currency }).toFormat();
  }
}
