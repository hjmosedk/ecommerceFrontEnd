import { CartService } from 'src/app/orders/cart.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  AddressModel,
  PersonalInformationModel,
} from 'src/app/shared/models/customer.model';
import { DineroModel } from 'src/app/shared/models/product.model';
import { CartItemModel } from '../models/cartItem.model';
import { Observable, Subscription, take } from 'rxjs';
import { Ecommerce } from 'ckh-typings';
import Dinero from 'dinero.js';
import { OrderService } from '../order.service';
import { newOrderModel } from '../models/order.model';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router, ActivatedRoute } from '@angular/router';
import {
  StripeElementsOptions,
  StripePaymentElementOptions,
} from '@stripe/stripe-js';
import { StripePaymentElementComponent } from 'ngx-stripe';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css',
})
export class CreateOrderComponent implements OnInit, OnDestroy {
  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  cartContent!: Observable<CartItemModel[]>;
  totalPriceSubscription!: Subscription;
  totalPrice: DineroModel = Dinero({ amount: 1, currency: 'DKK' }); //* This currency is only set to defined the object, it is being dynamically set by each product;
  disableDisplay: boolean = false;
  displayAddress: AddressModel = new AddressModel();
  orderComplete: boolean = false;
  paymentIntentSubscription!: Subscription;
  paymentLoading: boolean = false;

  @ViewChild('paymentElement')
  paymentElement!: StripePaymentElementComponent;

  stripe = this.orderService.stripe;
  elementsOptions: StripeElementsOptions = {
    locale: 'en',
    clientSecret: '',
  };

  paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: false,
    },
  };

  personalInformation: PersonalInformationModel =
    new PersonalInformationModel();
  shippingAddress: AddressModel = new AddressModel();
  billingAddress: AddressModel = new AddressModel();

  billingAddressInformationForm = this.formBuilder.group({
    same: [false],
  });

  orderItems = this.formBuilder.group({});

  newOrderForm = this.formBuilder.group({
    customer: this.formBuilder.group({
      personalInformation: [this.personalInformation ?? ' '],
      shippingAddressInformation: [this.shippingAddress ?? ''],
      billingAddressInformation: [this.billingAddress ?? ''],
    }),
    orderItems: this.orderItems,
    orderNotes: '',
  });

  stripeForm = this.formBuilder.group({
    amount: this.totalPrice.getAmount(),
  });

  calculatePrice(price: number, currency: Ecommerce.CurrencyType) {
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
    if (!this.paymentElement) {
      throw new Error(`Payment failed - Please try again!`);
    }
    const { clientSecret } = this.elementsOptions;
    if (!clientSecret) {
      throw new Error(`Payment failed - Please try again!`);
    }
    this.paymentLoading = true;

    this.orderService
      .confirmPayment(this.paymentElement.elements)
      .pipe(take(1))
      .subscribe(({ paymentIntent }) => {
        if (
          paymentIntent &&
          (paymentIntent.status === 'succeeded' ||
            paymentIntent.status === 'requires_capture')
        ) {
          this.cartService
            .cartContent()
            .pipe(take(1))
            .subscribe((cartContent) => {
              const newOrder = {
                customer: {
                  personalInformation: this.personalInformation,
                  shippingAddress: this.shippingAddress,
                  billingAddress: this.billingAddress,
                },
                orderItems: cartContent,
                orderCurrency: this.totalPrice.getCurrency(),
                orderNotes: this.newOrderForm.get('orderNotes')?.value,
                orderStatus: Ecommerce.OrderStatus.RECEIVED,
                paymentStatus: paymentIntent.status,
                paymentId: paymentIntent.id,
              } as newOrderModel;
              this.orderComplete = true;
              this.orderService.dispatchNewOrder(newOrder);
              this.cartService.clearCart();
              this.router.navigate(['completed'], { relativeTo: this.route });
            });
        } else {
          this.paymentLoading = false;
          throw new Error(
            `Payment failed due to: ${paymentIntent?.last_payment_error}`
          );
        }
        if (!paymentIntent) {
          this.paymentLoading = false;
          throw new Error(`Payment failed - Please try again!`);
        }
      });
  }

  onToggleChange(event: MatSlideToggleChange) {
    if (!event.checked) {
      this.billingAddress = new AddressModel();
    }
  }

  onPersonalInformationFormValueChange(value: PersonalInformationModel) {
    this.personalInformation = value;
  }

  onShippingAddressInformationFormValueChange(value: AddressModel) {
    this.shippingAddress = value;
  }

  onBillingAddressInformationFormValueChange(value: AddressModel) {
    this.billingAddress = value;
  }

  ngOnInit(): void {
    this.cartContent = this.cartService.cartContent();
    this.calculateTotalPrice();
    if (!this.orderComplete) {
      this.paymentIntentSubscription = this.orderService
        .createPaymentIntent(this.totalPrice.getCurrency(), this.cartContent)
        .pipe(take(1))
        .subscribe((paymentIntent) => {
          this.elementsOptions.clientSecret = paymentIntent.client_secret!;
        });
    }
  }

  ngOnDestroy(): void {
    this.totalPriceSubscription.unsubscribe();
    this.paymentIntentSubscription.unsubscribe();
  }
}
