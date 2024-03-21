import { Component, Input } from '@angular/core';
import { ProductModel } from 'src/app/shared/models/product.model';
import { Currency } from 'dinero.js';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { PriceService } from '../price.service';
import { environment } from 'src/environments/environment';
import { CartService } from 'src/app/orders/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
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
  product!: ProductModel;

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  calculatePrice(price: number = 2500, currency: Currency) {
    return this.priceService.calculatePrice(price, currency).toFormat();
  }

  addToCart(event: MouseEvent, product: ProductModel) {
    event.stopPropagation();
    this.cartService.addToCart(product);
  }

  onClick(productId: string) {
    this.scrollToTop();
    this.router.navigate(['/product', productId]);
  }
}
