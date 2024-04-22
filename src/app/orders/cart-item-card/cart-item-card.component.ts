import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartItemModel } from '../models/cartItem.model';
import { CartService } from '../cart.service';
import { Ecommerce } from 'ckh-typings';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-item-card',
  templateUrl: './cart-item-card.component.html',
  styleUrl: './cart-item-card.component.css',
})
export class CartItemCardComponent implements OnInit, OnDestroy {
  baseUrl = environment.baseUri;
  imagePath: string = '/images/';
  constructor(private cartService: CartService) {}
  public cartItemQuantity!: number;
  private cartItemQuantitySubscription: Subscription = Subscription.EMPTY;

  @Input()
  cartItem!: CartItemModel;

  calculatePrice(price: number, currency: Ecommerce.CurrencyType) {
    return this.cartService.calculatePrice(price, currency);
  }

  calculateLinePrice(cartItem: CartItemModel, quantity: number) {
    return this.cartService.calculateLinePrice(cartItem, quantity);
  }

  addToQuantity(id: number): void {
    this.cartItemQuantity = ++this.cartItemQuantity;
    this.cartService.updateCartItem(id, this.cartItemQuantity);
  }

  subtractFromQuantity(id: number): void {
    this.cartItemQuantity = --this.cartItemQuantity;
    if (!this.cartItemQuantity) {
      this.cartService.removeItem(id);
    } else {
      this.cartService.updateCartItem(id, this.cartItemQuantity);
    }
  }

  removeItem(id: number): void {
    this.cartService.removeItem(id);
  }

  ngOnInit(): void {
    this.cartItemQuantitySubscription = this.cartService
      .getOneItem(this.cartItem.id)
      .subscribe((cartItem) => {
        this.cartItemQuantity = cartItem!.salesQuantity;
      });
  }

  ngOnDestroy(): void {
    this.cartItemQuantitySubscription.unsubscribe();
  }
}
