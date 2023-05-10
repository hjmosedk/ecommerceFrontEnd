import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { CurrencyType } from '../types/productTypes';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../state/actions';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  productDataForm!: FormGroup;
  acceptableCurrencies: string[] = Object.values(CurrencyType);
  uuid: string = '';
  fileName: string = '';

  constructor(private store: Store) {}

  onSubmit() {
    this.store.dispatch(
      ProductsActions.createProduct(this.productDataForm.value)
    );
    this.productDataForm.reset();
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
      image: new FormControl('', {
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const extension: string | undefined = file.name
        .split('?')[0]
        .split('.')
        .pop();
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('image', file, `${uuid()}.${extension}`);
    }
  }
}

// TODO Change fileUpload to be more like the one used in this example, and get rid of dependency "Angular-Material-Component/file-input, it is blocking for angular update - https://blog.angular-university.io/angular-file-upload/"
