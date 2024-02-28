import { Injectable } from '@angular/core';
import { CartItemModel } from './models/cartItem.model';
import { CurrencyEnum, ProductModel } from '../shared/models/product.model';
import { CartActions } from './state/actions';
import { Store } from '@ngrx/store';
import { selectCartItems, selectCartLength } from './state/selectors';
import { PriceService } from '../product/price.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private store: Store, private priceService: PriceService) {}
  private orderedQuantity: number = 1;
  public orderedQuantity$: Subject<number> = new Subject();

  addToCart(product: ProductModel) {
    const cartItem = new CartItemModel(
      product.name,
      product.id,
      product.sku,
      product.description,
      product.price,
      product.image,
      this.orderedQuantity,
      product.currency
    );
    this.store.dispatch(CartActions.addToCart({ cartItem }));
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
    return this.priceService.calculatePrice(price, currency);
  }

  removeItem(id: string) {
    return this.store.dispatch(CartActions.removeFromCart({ id }));
  }

  increaseQuantity() {
    this.orderedQuantity++;
    this.orderedQuantity$.next(this.orderedQuantity);
  }

  decreaseQuantity(id: string) {
    this.orderedQuantity--;
    if (!this.orderedQuantity) {
      this.removeItem(id);
    }
    this.orderedQuantity$.next(this.orderedQuantity);
  }
}
