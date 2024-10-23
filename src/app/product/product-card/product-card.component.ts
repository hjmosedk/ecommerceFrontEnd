import { Component, Input } from '@angular/core';
import { Currency } from 'dinero.js';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { PriceService } from '../price.service';
import { environment } from 'src/environments/environment';
import { CartService } from 'src/app/orders/cart.service';
import { Ecommerce } from 'ckh-typings';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardImage, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css'],
    standalone: true,
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardSubtitle,
        MatCardImage,
        MatCardContent,
        MatCardActions,
        MatButton,
    ],
})
export class ProductCardComponent {
  baseUrl = environment.baseUri;
  imagePath: string = '/images/';
  constructor(
    private priceService: PriceService,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private cartService: CartService
  ) {}

  @Input()
  product!: Ecommerce.ProductModel;

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  calculatePrice(price: number = 2500, currency: Currency) {
    return this.priceService.calculatePrice(price, currency).toFormat();
  }

  addToCart(event: MouseEvent, product: Ecommerce.ProductModel) {
    event.stopPropagation();
    this.cartService.addToCart(product);
  }

  onClick(productId: number) {
    this.scrollToTop();
    this.router.navigate(['/products', productId]);
  }
}
