import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  AddressModel,
  PersonalInformationModel,
} from 'src/app/shared/models/customer.model';
import { DineroModel } from 'src/app/shared/models/product.model';
import { CartService } from '../cart.service';
import { CartItemModel } from '../models/cartItem.model';
import { Observable, Subscription, take } from 'rxjs';
import { Ecommerce } from 'ckh-typings';
import Dinero from 'dinero.js';
import { OrderService } from '../order.service';
import { newOrderModel } from '../models/order.model';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router, ActivatedRoute } from '@angular/router';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
  StripePaymentElementOptions,
} from '@stripe/stripe-js';
import {
  StripeCardComponent,
  StripeElementsDirective,
  StripeFactoryService,
  StripePaymentElementComponent,
  injectStripe,
} from 'ngx-stripe';
import { ErrorService } from 'src/app/services/error.service';

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
    private errorService: ErrorService
  ) {}

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
  cartContent: Observable<CartItemModel[]> | undefined = undefined;
  totalPriceSubscription!: Subscription;
  totalPrice: DineroModel = Dinero({ amount: 1, currency: 'DKK' }); //* This currency is only set to defined the object, it is being dynamically set by each product;
  disableDisplay: boolean = false;
  displayAddress: AddressModel = new AddressModel();
  paymentLoading: boolean = false;

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
      return;
    }
    const { clientSecret } = this.elementsOptions;
    if (!clientSecret) {
      return;
    }

    this.paymentLoading = true;
    this.orderService
      .processPayment(clientSecret, this.paymentElement.elements)
      ?.subscribe(({ paymentIntent }) => {
        console.log(paymentIntent);
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
              } as newOrderModel;
              this.orderService.dispatchNewOrder(newOrder);
              this.cartService.clearCart();
            });
          this.router.navigate(['completed'], { relativeTo: this.route });
        } else {
          throw new Error(
            `Payment failed due to: ${paymentIntent?.last_payment_error}`
          );
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
    this.orderService
      .getPaymentIntent(this.totalPrice.getCurrency(), this.cartContent)
      .subscribe((paymentIntent) => {
        this.elementsOptions.clientSecret = paymentIntent.clientSecret;
      });
  }

  ngOnDestroy(): void {
    this.totalPriceSubscription.unsubscribe();
  }
}
