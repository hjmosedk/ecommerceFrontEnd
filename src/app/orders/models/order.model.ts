import { Ecommerce } from 'ckh-typings';

export type OrderModel = Omit<
  Ecommerce.OrderModel,
  'orderDate' | 'lastChange' | 'id'
>;

//export type createOrderModel = Omit<Ecommerce.OrderModel, 'id'>;
