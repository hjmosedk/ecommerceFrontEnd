import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  name = new FormControl('Enter the name of the product');
}

/*
id: string;
name: string;
sku: string;
description: string;
price: number;
currency: Currency;
picture: string;
quantity: number;
brand: string;
percentage: number;
onSale: boolean;
*/
