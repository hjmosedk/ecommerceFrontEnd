import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'src/app/message/message.service';
import { MessageType } from 'src/app/message/modal/modal.component';
import { ProductService } from '../product.service';

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
    price: new FormControl(0),
    currency: new FormControl(),
    quantity: new FormControl(0),
    percentage: new FormControl(0),
    onSale: new FormControl(false),
  });
  // TODO: Remember to remove ? from types, as this is only added for testing before validation is implemented.

  constructor(
    private messageService: MessageService,
    private productService: ProductService
  ) {}

  onSubmit() {
    console.log(this.productData.value);
    this.productData.reset();
    this.productService.createProduct(this.productData.value);
    this.messageService.sendSystemMessage({
      type: MessageType.success,
      title: 'Success',
      message: 'This is a success',
    });
  }
}
