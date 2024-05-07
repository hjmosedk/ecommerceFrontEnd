import { Ecommerce } from 'ckh-typings';

export type newOrderModel = Omit<
  Ecommerce.OrderModel,
  'orderDate' | 'lastChange' | 'id'
>;

//export type createOrderModel = Omit<Ecommerce.OrderModel, 'id'>;
