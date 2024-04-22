import { Injectable } from '@angular/core';
import { CartItemModel } from './models/cartItem.model';
import { DineroModel } from '../shared/models/product.model';
import { CartActions } from './state/cart.actions';
import { Store } from '@ngrx/store';
import {
  selectCartItems,
  selectCartLength,
  selectCartEntitiesById,
  selectTotalPrice,
} from './state/cart.selectors';
import { PriceService } from '../product/price.service';
import { take, map } from 'rxjs';
import { Ecommerce } from 'ckh-typings';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private orderedQuantity: number = 1;

  constructor(private store: Store, private priceService: PriceService) {}

  addToCart(product: Ecommerce.ProductModel) {
    this.store
      .select(selectCartEntitiesById(product.id))
      .pipe(
        take(1),
        map((cartItem) => {
          if (!cartItem) {
            const newCartItem = new CartItemModel(
              product.name,
              product.id,
              product.sku,
              product.description,
              product.price,
              product.image,
              this.orderedQuantity,
              product.currency,
              product.id,
              product
            );
            this.store.dispatch(
              CartActions.addToCart({ cartItem: newCartItem })
            );
          } else {
            return;
          }
        })
      )
      .subscribe();
  }

  updateCartItem(id: number, quantity: number) {
    this.store.dispatch(CartActions.updateCart({ id, quantity }));
  }

  clearCart() {
    this.store.dispatch(CartActions.clearCart());
  }

  cartLength() {
    return this.store.select(selectCartLength);
  }

  cartContent() {
    return this.store.select(selectCartItems);
  }

  calculatePrice(price: number, currency: Ecommerce.CurrencyType) {
    return this.priceService.calculatePrice(price, currency).toFormat();
  }

  calculateLinePrice(cartItem: CartItemModel, quantity: number) {
    const linePrice = this.priceService.calculatePrice(
      cartItem.price,
      cartItem.currency
    );
    return this.priceService.multiplyPrice(linePrice, quantity).toFormat();
  }

  removeItem(id: number) {
    return this.store.dispatch(CartActions.removeFromCart({ id }));
  }

  getOneItem(id: number) {
    return this.store.select(selectCartEntitiesById(id));
  }

  updateTotalPrice() {
    return this.store.select(selectTotalPrice);
  }

  calculateTax(totalPrice: DineroModel, taxRate: number) {
    const calculatedTaxRate = taxRate / 100;
    return totalPrice.multiply(calculatedTaxRate);
  }
}
