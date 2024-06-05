import { Ecommerce } from 'ckh-typings';

export type newOrderModel = Omit<
  Ecommerce.OrderModel,
  'orderDate' | 'lastChange' | 'id' | 'orderTotalPrice'
>;

//export type createOrderModel = Omit<Ecommerce.OrderModel, 'id'>;
