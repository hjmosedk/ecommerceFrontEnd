import { Ecommerce } from 'ckh-typings';

export type DineroModel = Dinero.Dinero;

export type NewProductModel = Omit<Ecommerce.ProductModel, 'id'>;
