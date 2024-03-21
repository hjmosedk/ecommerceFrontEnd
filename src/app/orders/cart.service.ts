import { Injectable } from '@angular/core';
import { CartItemModel } from './models/cartItem.model';
import { CurrencyEnum, ProductModel } from '../shared/models/product.model';
import { CartActions } from './state/actions';
import { Store } from '@ngrx/store';
import {
  selectCartItems,
  selectCartLength,
  selectCartEntitiesById,
} from './state/selectors';
import { PriceService } from '../product/price.service';
import { Subject, take, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private store: Store, private priceService: PriceService) {}
  private orderedQuantity: number = 1;

  addToCart(product: ProductModel) {
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
              product.currency
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

  updateCartItem(id: string, quantity: number) {
    console.log(`This is the service ${quantity}`);
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

  calculatePrice(price: number, currency: CurrencyEnum) {
    return this.priceService.calculatePrice(price, currency).toFormat();
  }

  calculateLinePrice(cartItem: CartItemModel, quantity: number) {
    const linePrice = this.priceService.calculatePrice(
      cartItem.price,
      cartItem.currency
    );
    return this.priceService.multiplyPrice(linePrice, quantity).toFormat();
  }

  removeItem(id: string) {
    return this.store.dispatch(CartActions.removeFromCart({ id }));
  }

  getOneItem(id: string) {
    return this.store.select(selectCartEntitiesById(id));
  }
}
