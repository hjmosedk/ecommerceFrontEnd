import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/shared/models/product.model';
import { Currency } from 'dinero.js';
import { CurrencyEnum } from 'src/app/shared/models/product.model';
import { PriceService } from '../price.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  baseUrl = environment.baseUri;
  imagePath: string = '/images/';
  constructor(private priceService: PriceService) {}

  @Input()
  product!: ProductModel;

  calculatePrice(price: number = 2500, currency: Currency) {
    return this.priceService.calculatePrice(price, currency);
  }

  trimName(name: string) {
    return name.substring(0, 14);
  }

  consoleWriteLength(name: string, description: string) {
    console.log(`${name}: ${description.length}`);
  }

  trimDescription(description: string) {
    console.log(`${description.length}`);
    const trimmedDescription = description.substring(0, 300);
    console.log(`${trimmedDescription.length}`);
    return trimmedDescription;
  }

  ngOnInit(): void {
    this.consoleWriteLength(this.product.name, this.product.description);
  }
}
