import { createActionGroup, props } from '@ngrx/store';

import { CreatedOrderModel, OrderModel } from '../models/order.model';

export const OrderActions = createActionGroup({
  source: 'order',
  events: {
    'Create Order': props<{ newOrder: OrderModel }>(),
    'Create Order Success': props<{ createdOrder: CreatedOrderModel }>(),
  },
});
