import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ecommerce } from 'ckh-typings';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatLabel, MatHint, MatError } from '@angular/material/form-field';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { MatCard, MatCardLgImage } from '@angular/material/card';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.css'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatHint,
        MatError,
        FileUploadComponent,
        MatCard,
        MatCardLgImage,
        MatSelect,
        MatOption,
        MatSlideToggle,
        MatButton,
    ],
})
export class ProductFormComponent implements OnInit {
  productDataForm!: FormGroup;
  @Input() product: Ecommerce.ProductModel | undefined;
  @Output() changedProduct: EventEmitter<Ecommerce.ProductModel> =
    new EventEmitter<Ecommerce.ProductModel>();
  acceptableCurrencies: string[] = Object.values(Ecommerce.CurrencyType);
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
      currency: new FormControl(Ecommerce.CurrencyType.DKK, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      quantity: new FormControl(this.product?.quantity, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
      percentage: new FormControl(this.product?.percentage || 0),
      onSale: new FormControl(this.product?.onSale, {
        validators: [Validators.required],
      }),
      isPublic: new FormControl(this.product?.isPublic, {
        validators: [Validators.required],
      }),
    });
  }

  getImageMetaData(image: { imageId: string; imageString: string }): void {
    this.imageId = image.imageId;
    this.imageString = image.imageString;
  }
}
