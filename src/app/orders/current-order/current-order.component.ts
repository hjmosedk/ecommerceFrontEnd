import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { filter, Observable } from 'rxjs';
import { Ecommerce } from 'ckh-typings';
import { environment } from 'src/environments/environment';
import { CartService } from '../cart.service';
import Dinero from 'dinero.js';
import { Router } from '@angular/router';
import { Location, AsyncPipe } from '@angular/common';
import { OrderService } from '../order.service';
import { MatButton } from '@angular/material/button';
import { StatusStepperComponent } from '../status-stepper/status-stepper.component';

@Component({
    selector: 'app-current-order',
    templateUrl: './current-order.component.html',
    styleUrl: './current-order.component.css',
    standalone: true,
    imports: [
        MatButton,
        StatusStepperComponent,
        AsyncPipe,
    ],
})
export class CurrentOrderComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private location: Location,
    private orderService: OrderService
  ) {}
  baseUrl = environment.baseUri;
  currentOrder: Observable<Ecommerce.OrderModel | undefined> = new Observable(
    undefined
  );

  orderStatus: Ecommerce.OrderStatus | undefined;

  calculatePrice(price: number, currency: Ecommerce.CurrencyType) {
    return this.cartService.calculatePrice(price, currency);
  }

  calculateLinePrice(price: number, quantity: number) {
    const itemPrice = Dinero({
      amount: price,
      currency: Ecommerce.CurrencyType.DKK,
    });

    return itemPrice.multiply(quantity).toFormat();
  }

  ngOnInit(): void {
    this.currentOrder = this.orderService
      .getCurrentOrder()
      .pipe(filter((order) => order !== undefined));
  }

  goBack(): void {
    this.location.back();
  }
}
