import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { Observable } from 'rxjs';
import { Ecommerce } from 'ckh-typings';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CartService } from '../cart.service';
import Dinero from 'dinero.js';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.component.html',
  styleUrl: './current-order.component.css',
})
export class CurrentOrderComponent implements OnInit {
  constructor(
    private orderService: OrdersService,
    private cartService: CartService
  ) {}
  baseUrl = environment.baseUri;
  currentOrder: Observable<Ecommerce.OrderModel[]> | undefined;
  isCurrentOrderEmpty: Observable<boolean> | undefined;

  calculatePrice(price: number) {
    return this.cartService.calculatePrice(price, Ecommerce.CurrencyType.DKK);
  }

  calculateLinePrice(price: number, quantity: number) {
    const itemPrice = Dinero({
      amount: price,
      currency: Ecommerce.CurrencyType.DKK,
    });

    return itemPrice.toFormat();
  }

  ngOnInit(): void {
    this.currentOrder = this.orderService.getCurrentOrder();
    this.isCurrentOrderEmpty = this.currentOrder.pipe(
      map((order) => order.length === 0)
    );
  }

  onClick() {
    this.orderService.setCurrentOrder(11);
  }
}
