import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { OrderModel } from '../models/order.model';

export interface OrderState extends EntityState<OrderModel> {}

export const orderAdapter = createEntityAdapter<OrderModel>();
