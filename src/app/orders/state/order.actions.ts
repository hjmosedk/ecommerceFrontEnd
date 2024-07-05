import { createActionGroup, props } from '@ngrx/store';

import { newOrderModel } from '../models/order.model';
import { Ecommerce } from 'ckh-typings';

export const OrderActions = createActionGroup({
  source: 'order',
  events: {
    'Create Order': props<{ newOrder: newOrderModel }>(),
    'Create Order Success': props<{ createdOrder: Ecommerce.OrderModel }>(),
    'Get Order': props<{ orderId: number }>(),
    'Get Order Success': props<{ order: Ecommerce.OrderModel }>(),
    'Update Order Status': props<{
      orderId: number;
      newStatus: Ecommerce.OrderStatus;
    }>(),
    'Update Order Status Success': props<{
      updatedOrder: Ecommerce.OrderModel;
    }>(),
  },
});
