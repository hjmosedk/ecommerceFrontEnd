import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../types/productTypes';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header-carousel',
  templateUrl: './header-carousel.component.html',
  styleUrls: ['./header-carousel.component.css'],
})
export class HeaderCarouselComponent implements OnInit {
  products: Product[] = [];
  baseUrl = environment.baseUri;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
    console.log(this.products);
    console.log(this.baseUrl);
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
    console.log(this.products);
  }

  getProductImageURL(product: Product): string {
    console.log(`${this.baseUrl}/images/${product.image}`);
    return `${this.baseUrl}/images/${product.image}`;
  }

  calculateSalePrice(price: number, percentage: number): number {
    return price - price * (percentage / 100);
  }
}
