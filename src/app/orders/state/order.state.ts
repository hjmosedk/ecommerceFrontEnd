import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Ecommerce } from 'ckh-typings';

export interface OrderState extends EntityState<Ecommerce.OrderModel> {}

export const orderAdapter = createEntityAdapter<Ecommerce.OrderModel>();
