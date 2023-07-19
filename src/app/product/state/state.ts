import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { ProductModel } from 'src/app/shared/models/product.model';

export interface ProductsState extends EntityState<ProductModel> {}

export const productsAdapter = createEntityAdapter<ProductModel>();
