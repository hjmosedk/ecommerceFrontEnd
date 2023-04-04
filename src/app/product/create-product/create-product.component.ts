import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  productData = new FormGroup({
    name: new FormControl('Enter the name of the product'),
    sku: new FormControl('Enter the SKU of the product'),
    description: new FormControl('Enter the description of the product'),
    picture: new FormControl('Input the picture'),
    brand: new FormControl('Input the brand of the products'),
    financialData: new FormGroup({
      price: new FormControl(0),
      currency: new FormControl('DKK'),
      quantity: new FormControl(0),
      percentage: new FormControl(0),
      onSale: new FormControl(false),
    }),
  });

  constructor() {}

  onSubmit() {
    console.log(this.productData.value);
    this.productData.reset();
  }
}
