import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartItemModel } from '../models/cartItem.model';
import { CartService } from '../cart.service';
import { CurrencyEnum } from 'src/app/shared/models/product.model';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-item-card',
  templateUrl: './cart-item-card.component.html',
  styleUrl: './cart-item-card.component.css',
})
export class CartItemCardComponent implements OnInit, OnDestroy {
  baseUrl = environment.baseUri;
  imagePath: string = '/images/';
  constructor(private cartService: CartService) {}
  private orderedQuantity: number = 1;
  public orderedQuantity$: Subject<number> = new Subject();

  salesQuantitySubscription: Subscription | null = null;

  salesQuantity: number = 1;

  @Input()
  cartItem!: CartItemModel;

  calculatePrice(price: number, currency: CurrencyEnum) {
    return this.cartService.calculatePrice(price, currency);
  }

  ngOnInit(): void {
    this.orderedQuantity$.next(this.orderedQuantity);
    this.salesQuantitySubscription = this.orderedQuantity$.subscribe(
      (quantity) => (this.salesQuantity = quantity)
    );
  }

  addToQuantity(): void {
    this.orderedQuantity++;
    this.orderedQuantity$.next(this.orderedQuantity);
  }

  subtractFromQuantity(id: string): void {
    this.orderedQuantity--;
    if (!this.orderedQuantity) {
      this.cartService.removeItem(id);
    }
    this.orderedQuantity$.next(this.orderedQuantity);
  }

  removeItem(id: string): void {
    this.cartService.removeItem(id);
  }

  ngOnDestroy(): void {
    if (this.salesQuantitySubscription) {
      this.salesQuantitySubscription.unsubscribe();
    }
  }
}
