import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MessageService } from 'src/app/message/message.service';
import { MessageType } from 'src/app/message/modal/modal.component';
import { ProductService } from '../product.service';
import { CurrencyType } from '../types/productTypes';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  productDataForm!: FormGroup;

  acceptableCurrencies: string[] = Object.values(CurrencyType);

  constructor(
    private messageService: MessageService,
    private productService: ProductService
  ) {}

  onSubmit() {
    this.productDataForm.reset();
    this.productService
      .createProduct(this.productDataForm.getRawValue())
      .subscribe();
    /*this.messageService.sendSystemMessage({
      type: MessageType.success,
      title: 'Success',
      message: JSON.stringify(this.productDataForm.getRawValue()),
    })*/
  }

  get formData(): { [key: string]: AbstractControl } {
    return this.productDataForm.controls;
  }

  ngOnInit(): void {
    this.productDataForm = new FormGroup({
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      sku: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      description: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      picture: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      brand: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      price: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(100)],
      }),
      currency: new FormControl(CurrencyType.DKK, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      quantity: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
      percentage: new FormControl(0),
      onSale: new FormControl(false, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }
}
