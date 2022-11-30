import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input()
  product = {
    title: 'Mobile',
    image: 'assets/images/mobile-img.png',
    description: 'This is the description of the product',
    brand: 'Samsung',
    percentage: '70 %',
    price: 999,
    onSale: true,
  };
}
