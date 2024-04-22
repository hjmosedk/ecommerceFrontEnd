import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Ecommerce } from 'ckh-typings';

export interface ProductsState extends EntityState<Ecommerce.ProductModel> {}

export const productsAdapter = createEntityAdapter<Ecommerce.ProductModel>();
