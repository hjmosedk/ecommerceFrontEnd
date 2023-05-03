import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Product } from '../types/productTypes';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Currency } from 'dinero.js';
import { PriceService } from '../price.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  @ViewChild('carouselWrapper')
  carouselWrapper!: ElementRef;
  products: Product[] = [];

  currentSlideIndex = 0;
  carouselWrapperWidth = 0;
  slideWidth = 0;
  slideMarginRight = 0;

  constructor(
    private productService: ProductService,
    private router: Router,
    private priceService: PriceService
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  onSlideNext(): void {
    this.currentSlideIndex++;
    if (this.currentSlideIndex >= this.products.length) {
      this.currentSlideIndex = 0;
    }
  }

  onSlidePrev(): void {
    this.currentSlideIndex--;
    if (this.currentSlideIndex < 0) {
      this.currentSlideIndex = this.products.length - 1;
    }
  }

  getSlideTransformStyle(): string {
    return `translateX(-${
      this.currentSlideIndex * (this.slideWidth + this.slideMarginRight)
    }px)`;
  }

  onResize(): void {
    this.carouselWrapperWidth = this.carouselWrapper.nativeElement.offsetWidth;
    this.slideWidth = Math.floor(this.carouselWrapperWidth * 0.7);
    this.slideMarginRight = Math.floor(this.carouselWrapperWidth * 0.05);
  }

  navigateToProduct(productId: string) {
    this.router.navigate(['/product', productId]);
  }

  calculatePrice(price: number, currency: Currency) {
    return this.priceService.calculatePrice(price, currency);
  }
}
