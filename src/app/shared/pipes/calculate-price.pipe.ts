import { CartService } from 'src/app/orders/cart.service';
import { Pipe, PipeTransform } from '@angular/core';
import { Ecommerce } from 'ckh-typings';

@Pipe({
  name: 'calculatePrice',
  standalone: false,
})
export class CalculatePricePipe implements PipeTransform {
  constructor(private cartService: CartService) {}

  transform(price: number, currency: Ecommerce.CurrencyType): string {
    return this.cartService.calculatePrice(price, currency);
  }
}
