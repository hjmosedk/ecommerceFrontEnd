import { createActionGroup, props } from '@ngrx/store';

import { OrderModel } from '../models/order.model';
import { Ecommerce } from 'ckh-typings';

export const OrderActions = createActionGroup({
  source: 'order',
  events: {
    'Create Order': props<{ newOrder: OrderModel }>(),
    'Create Order Success': props<{ createdOrder: Ecommerce.OrderModel }>(),
  },
});
