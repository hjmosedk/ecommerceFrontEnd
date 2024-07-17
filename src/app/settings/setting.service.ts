import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ecommerce } from 'ckh-typings';

export interface orderStatusChange {
  content: string;
  title: Ecommerce.OrderStatus;
}

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  constructor(private http: HttpClient) {}

  statusMessage!: orderStatusChange;
  baseUri = environment.baseUri;

  receiveOrderMessage: string =
    'You will put the order into received, this will reserve the order on the customers account - This is the default status';
  reserveOrderMessage: string =
    'This will place a backorder into the system - You are sill required to fulfill the order';
  confirmOrderMessage: string =
    'You will confirm the order and commit to packing and shipping the order to the customer, and the money will be withdrawn from their account.';
  packOrderMessage: string =
    'The order will be marked as packed, and ready for shipment';
  shipOrderMessage: string = 'The order will be marked as shipped';
  closeOrderMessage: string = 'The order will be marked as shipped';

  getOrderNextStatus(
    orderStatus: Ecommerce.OrderStatus
  ): Ecommerce.OrderStatus {
    switch (orderStatus) {
      case Ecommerce.OrderStatus.RECEIVED:
      default:
        return Ecommerce.OrderStatus.CONFIRMED;
      case Ecommerce.OrderStatus.CONFIRMED:
        return Ecommerce.OrderStatus.PACKED;
      case Ecommerce.OrderStatus.PACKED:
        return Ecommerce.OrderStatus.SHIPPED;
      case Ecommerce.OrderStatus.SHIPPED:
        return Ecommerce.OrderStatus.CLOSED;
      case Ecommerce.OrderStatus.RESERVED:
        return Ecommerce.OrderStatus.RESERVED;
      case Ecommerce.OrderStatus.CLOSED:
        return Ecommerce.OrderStatus.RECEIVED;
    }
  }

  getOrderMessage(
    status: Ecommerce.OrderStatus
  ): Observable<orderStatusChange> {
    const nextStatus = this.getOrderNextStatus(status);

    return this.http.get<orderStatusChange>(
      `${this.baseUri}/settings/${nextStatus}`
    );
  }
}
