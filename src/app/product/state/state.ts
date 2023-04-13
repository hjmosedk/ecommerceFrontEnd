import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Product } from '../types/productTypes';

export interface ProductsState extends EntityState<Product> {}

export const productsAdapter = createEntityAdapter<Product>();
