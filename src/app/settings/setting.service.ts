import { Injectable } from '@angular/core';
import { Ecommerce } from 'ckh-typings';

interface orderStatusChange {
  message: string;
  newStatus: Ecommerce.OrderStatus;
}

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  constructor() {}

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

  getOrderMessage(orderStatus: Ecommerce.OrderStatus): orderStatusChange {
    switch (orderStatus) {
      case Ecommerce.OrderStatus.RECEIVED:
      default:
        return {
          message: this.confirmOrderMessage,
          newStatus: Ecommerce.OrderStatus.CONFIRMED,
        };

      case Ecommerce.OrderStatus.CONFIRMED:
        return {
          message: this.packOrderMessage,
          newStatus: Ecommerce.OrderStatus.PACKED,
        };
      case Ecommerce.OrderStatus.PACKED:
        return {
          message: this.shipOrderMessage,
          newStatus: Ecommerce.OrderStatus.SHIPPED,
        };
      case Ecommerce.OrderStatus.SHIPPED:
        return {
          message: this.closeOrderMessage,
          newStatus: Ecommerce.OrderStatus.CLOSED,
        };
      case Ecommerce.OrderStatus.RESERVED:
        return {
          message: this.reserveOrderMessage,
          newStatus: Ecommerce.OrderStatus.RESERVED,
        };
      case Ecommerce.OrderStatus.CLOSED:
        return {
          message: this.receiveOrderMessage,
          newStatus: Ecommerce.OrderStatus.RECEIVED,
        };
    }
  }
}
