import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  AddressModel,
  PersonalInformationModel,
} from 'src/app/shared/models/product.model';
import { CartService } from '../cart.service';
import { CartItemModel } from '../models/cartItem.model';
import { Observable } from 'rxjs';
import { CurrencyEnum } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css',
})
export class CreateOrderComponent implements OnInit {
  cartContent: Observable<CartItemModel[]> | undefined = undefined;

  personalInformation: PersonalInformationModel =
    new PersonalInformationModel();
  shippingAddress: AddressModel = new AddressModel();
  billingAddress: AddressModel = new AddressModel();

  personalInformationForm = this.formBuilder.group({
    firstName: [this.personalInformation.firstName, [Validators.required]],
    lastName: [this.personalInformation.lastName, [Validators.required]],
    email: [
      this.personalInformation.email,
      [Validators.required, Validators.email],
    ],
    phone: [this.personalInformation.phone, [Validators.required]],
    middleName: [this.personalInformation.middleName, []],
  });

  shippingAddressInformation = this.formBuilder.group({
    address: [this.shippingAddress.address, [Validators.required]],
    address2nd: [this.shippingAddress.address2nd, []],
    city: [this.shippingAddress.city, [Validators.required]],
    zipCode: [this.shippingAddress.zipCode, [Validators.required]],
    country: [this.shippingAddress.country, [Validators.required]],
  });

  billingAddressInformation = this.formBuilder.group({
    address: [this.billingAddress.address, [Validators.required]],
    address2nd: [this.billingAddress.address2nd, []],
    city: [this.billingAddress.city, [Validators.required]],
    zipCode: [this.billingAddress.zipCode, [Validators.required]],
    country: [this.billingAddress.country, [Validators.required]],
  });

  order = this.formBuilder.group({});

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService
  ) {}

  calculatePrice(price: number, currency: CurrencyEnum) {
    return this.cartService.calculatePrice(price, currency);
  }
  calculateLinePrice(cartItem: CartItemModel, quantity: number) {
    return this.cartService.calculateLinePrice(cartItem, quantity);
  }

  ngOnInit(): void {
    this.cartContent = this.cartService.cartContent();
  }
}
