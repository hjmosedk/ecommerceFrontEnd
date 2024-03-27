import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AddressModel,
  PersonalInformationModel,
} from 'src/app/shared/models/customer.model';
import { DineroModel } from 'src/app/shared/models/product.model';
import { CartService } from '../cart.service';
import { CartItemModel } from '../models/cartItem.model';
import { Observable, Subscription, take } from 'rxjs';
import { CurrencyEnum } from 'src/app/shared/models/product.model';
import Dinero from 'dinero.js';
import { OrdersService } from '../orders.service';
import { OrderModel } from '../models/order.model';
import { Store } from '@ngrx/store';
import { OrderActions } from '../state/order.actions';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css',
})
export class CreateOrderComponent implements OnInit, OnDestroy {
  cartContent: Observable<CartItemModel[]> | undefined = undefined;
  totalPriceSubscription!: Subscription;
  totalPrice: DineroModel = Dinero({ amount: 1, currency: 'DKK' });

  personalInformation: PersonalInformationModel =
    new PersonalInformationModel();
  shippingAddress: AddressModel = new AddressModel();
  billingAddress: AddressModel = new AddressModel();

  personalInformationForm = this.formBuilder.group({
    firstName: [
      this.personalInformation.firstName || '',
      [Validators.required],
    ],
    lastName: [this.personalInformation.lastName || '', [Validators.required]],
    email: [
      this.personalInformation.email || '',
      [Validators.required, Validators.email],
    ],
    phone: [this.personalInformation.phone || '', [Validators.required]],
    middleName: [this.personalInformation.middleName, []],
  });

  shippingAddressInformationForm = this.formBuilder.group({
    address: [this.shippingAddress.address || '', [Validators.required]],
    address2nd: [this.shippingAddress.address2nd, []],
    city: [this.shippingAddress.city || '', [Validators.required]],
    zipCode: [this.shippingAddress.zipCode || '', [Validators.required]],
    country: [this.shippingAddress.country || '', [Validators.required]],
  });

  billingAddressInformationForm = this.formBuilder.group({
    address: [this.billingAddress.address || '', [Validators.required]],
    address2nd: [this.billingAddress.address2nd, []],
    city: [this.billingAddress.city || '', [Validators.required]],
    zipCode: [this.billingAddress.zipCode || '', [Validators.required]],
    country: [this.billingAddress.country || '', [Validators.required]],
  });

  orderItems = this.formBuilder.group({});

  newOrderForm = this.formBuilder.group({
    customer: this.formBuilder.group({
      personalInformation: this.personalInformationForm ?? ' ',
      shippingAddressInformation: this.shippingAddressInformationForm ?? '',
      billingAddressInformation: this.billingAddressInformationForm ?? '',
    }),
    orderItems: this.orderItems,
    orderNotes: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrdersService
  ) {}

  calculatePrice(price: number, currency: CurrencyEnum) {
    return this.cartService.calculatePrice(price, currency);
  }
  calculateLinePrice(cartItem: CartItemModel, quantity: number) {
    return this.cartService.calculateLinePrice(cartItem, quantity);
  }

  calculateTotalPrice() {
    this.totalPriceSubscription = this.cartService
      .updateTotalPrice()
      .subscribe((totalPrice) => (this.totalPrice = totalPrice));
  }

  calculateTaxRate(totalPrice: DineroModel) {
    return this.cartService.calculateTax(totalPrice, 20);
  }

  calculateSubTotal() {
    const taxPrice = this.calculateTaxRate(this.totalPrice);
    return this.totalPrice.subtract(taxPrice);
  }

  onSubmit() {
    this.cartService
      .cartContent()
      .pipe(take(1))
      .subscribe((cartContent) => {
        const newOrder = {
          customer: {
            personalInformation: this.personalInformationForm.value,
            shippingAddress: this.shippingAddressInformationForm.value,
            billingAddress: this.billingAddressInformationForm.value,
          },
          orderItems: cartContent,
        } as OrderModel;
        this.orderService.dispatchNewOrder(newOrder);
        this.cartService.clearCart();
      });
  }

  ngOnInit(): void {
    this.cartContent = this.cartService.cartContent();
    this.calculateTotalPrice();
  }

  ngOnDestroy(): void {
    this.totalPriceSubscription.unsubscribe();
  }
}
