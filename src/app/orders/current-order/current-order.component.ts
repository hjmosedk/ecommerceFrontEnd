import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { filter, Observable } from 'rxjs';
import { Ecommerce } from 'ckh-typings';
import { environment } from 'src/environments/environment';
import { CartService } from '../cart.service';
import Dinero from 'dinero.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.component.html',
  styleUrl: './current-order.component.css',
})
export class CurrentOrderComponent implements OnInit {
  constructor(
    private orderService: OrdersService,
    private cartService: CartService,
    private router: Router
  ) {}
  baseUrl = environment.baseUri;
  currentOrder: Observable<Ecommerce.OrderModel | undefined> = new Observable(
    undefined
  );
  isCurrentOrderEmpty: Observable<boolean> | undefined;
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

  onClick() {
    this.orderService.setCurrentOrder(11);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
