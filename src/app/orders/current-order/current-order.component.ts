import { Component, OnInit, signal } from '@angular/core';
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
  testOrderStatus: Ecommerce.OrderStatus | undefined = undefined;
  orderStatus: Ecommerce.OrderStatus[] = Object.values(Ecommerce.OrderStatus);

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
    this.currentOrder = this.orderService.getCurrentOrder();
    this.isCurrentOrderEmpty = this.currentOrder.pipe(
      map((order) => order.length === 0)
    );
  }

  onClick() {
    this.orderService.setCurrentOrder(11);
  }

  setOrderStatus(orderStatus: Ecommerce.OrderStatus) {
    this.testOrderStatus = orderStatus;
  }
}
