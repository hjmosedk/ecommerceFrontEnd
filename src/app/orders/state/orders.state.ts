import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Ecommerce } from 'ckh-typings';

export interface OrdersState extends EntityState<Ecommerce.OrderModel> {}

export const OrdersAdapter = createEntityAdapter<Ecommerce.OrderModel>();
