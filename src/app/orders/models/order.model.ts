import { CustomerModel } from 'src/app/shared/models/customer.model';
import { CartItemModel } from './cartItem.model';

export interface OrderModel {
  orderItems: CartItemModel[];
  customer: CustomerModel;
  orderNotes?: string;
}

export interface CreatedOrderModel extends OrderModel {
  id: number;
  orderDate: string;
  lastChange: string;
  orderStatus: OrderStatus;
}

export enum OrderStatus {
  RECEIVED = 'RECEIVED',
  RESERVED = 'RESERVED',
  CONFIRMED = 'CONFIRMED',
  PACKED = 'PACKED',
  SHIPPED = 'SHIPPED',
  CLOSED = 'CLOSED',
}
