import { Component, OnDestroy, OnInit } from '@angular/core';
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
} from '@stripe/stripe-js';
import { StripeFactoryService, injectStripe } from 'ngx-stripe';
import { environment } from 'src/environments/environment';

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
    private stripeService: StripeFactoryService
  ) {}

  stripe = injectStripe(environment.stripe_key);
  elementsOptions: StripeElementsOptions = {
    locale: 'en',
    clientSecret: '',
  };
  cardOptions!: StripeCardElementOptions;
  cartContent: Observable<CartItemModel[]> | undefined = undefined;
  totalPriceSubscription!: Subscription;
  totalPrice: DineroModel = Dinero({ amount: 1, currency: 'DKK' }); //* This currency is only set to defined the object, it is being dynamically set by each product;
  disableDisplay: boolean = false;
  displayAddress: AddressModel = new AddressModel();
  paymentIntent: Observable<string> = new Observable();

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
    const { clientSecret } = this.elementsOptions;
    this.orderService.processPayment(clientSecret);
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
        //this.orderService.dispatchNewOrder(newOrder);
        this.cartService.clearCart();
      });
    this.router.navigate(['completed'], { relativeTo: this.route });
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
    this.paymentIntent = this.orderService.getPaymentIntent(
      this.totalPrice.getAmount(),
      this.totalPrice.getCurrency()
    ); /* .subscribe({
        next: (paymentIntent) => {
          console.log('paymentIntent:', paymentIntent);
          this.elementsOptions.clientSecret = paymentIntent;
          console.log('ElementsOptions:', this.elementsOptions);
        },
        error: (error) => {
          console.error('Error:', error);
        },
        complete: () => {
          console.log('Request completed');
        },
      });*/
  }

  ngOnDestroy(): void {
    this.totalPriceSubscription.unsubscribe();
  }
}
