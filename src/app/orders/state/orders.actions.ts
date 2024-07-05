import { OrderModel } from 'ckh-typings/dist/ecommerce';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Ecommerce } from 'ckh-typings';

export const OrdersActions = createActionGroup({
  source: 'orders',
  events: {
    'Load Orders': emptyProps(),
    'Load Orders Success': props<{ orders: Ecommerce.OrderModel[] }>(),
  },
});
