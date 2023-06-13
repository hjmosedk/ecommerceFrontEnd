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
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  productDataForm!: FormGroup;
  acceptableCurrencies: string[] = Object.values(CurrencyType);
  fileName: string = '';
  imageId?: string | undefined;
  imageString: string = ``;
  baseUri = environment.baseUri;

  constructor(private store: Store, private http: HttpClient) {}

  onSubmit() {
    this.productDataForm.patchValue({ image: this.imageId });
    const newProduct = this.productDataForm.value;
    this.store.dispatch(ProductsActions.createProduct(newProduct));
    this.productDataForm.reset();
    this.imageId = undefined;
    this.fileName = '';
  }

  get formData(): { [key: string]: AbstractControl } {
    return this.productDataForm.controls;
  }

  ngOnInit(): void {
    this.productDataForm = new FormGroup({
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(14)],
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
      }),
      category: new FormControl('', {
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
      const uploadImage = new FormData();
      uploadImage.append('image', file, `${uuid()}.${extension}`);
      const uploadedImage = this.http.post<{ name: string }>(
        `${this.baseUri}/images/upload`,
        uploadImage
      );
      uploadedImage.subscribe((image) => {
        this.imageId = image.name;
        this.imageString = `${this.baseUri}/images/${this.imageId}`;
      });
    }
  }
}

// TODO Change fileUpload to be more like the one used in this example, and get rid of dependency "Angular-Material-Component/file-input, it is blocking for angular update - https://blog.angular-university.io/angular-file-upload/"
