import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import {
  CurrencyEnum,
  ProductModel,
} from 'src/app/shared/models/product.model';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  productDataForm!: FormGroup;
  @Input() product: ProductModel | undefined;
  @Output() changedProduct: EventEmitter<ProductModel> =
    new EventEmitter<ProductModel>();
  acceptableCurrencies: string[] = Object.values(CurrencyEnum);
  fileName: string = '';
  reset: boolean = false;
  @Input() imageId?: string | undefined;
  @Input() imageString: string = ``;
  @Input() baseUri: string = '';
  @Input() skuIsActive: boolean = true;

  constructor() {}

  onSubmit() {
    this.productDataForm.patchValue({ image: this.imageId });
    const newProduct = this.productDataForm.value;
    this.changedProduct.emit(newProduct);
    this.productDataForm.reset();
    this.imageId = undefined;
    this.fileName = '';
    this.reset = true;
  }

  get formData(): { [key: string]: AbstractControl } {
    return this.productDataForm.controls;
  }

  ngOnInit(): void {
    this.productDataForm = new FormGroup({
      name: new FormControl(this.product?.name, {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(14)],
      }),
      sku: new FormControl(this.product?.sku, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      description: new FormControl(this.product?.description, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      image: new FormControl(this.product?.image, {
        nonNullable: true,
      }),
      category: new FormControl(this.product?.category, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      price: new FormControl(this.product?.price, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(100)],
      }),
      currency: new FormControl(CurrencyEnum.DKK, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      quantity: new FormControl(this.product?.quantity, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
      percentage: new FormControl(this.product?.percentage || 0),
      onSale: new FormControl(this.product?.onSale, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  getImageMetaData(image: { imageId: string; imageString: string }): void {
    this.imageId = image.imageId;
    this.imageString = image.imageString;
  }
}
