import { Currency } from 'dinero.js';

export interface Product {
  id?: string | undefined | null;
  name?: string | undefined | null;
  sku?: string | undefined | null;
  description?: string | undefined | null;
  price?: number | undefined | null;
  currency?: Currency | undefined | null;
  picture?: string | undefined | null;
  quantity?: number | undefined | null;
  brand?: string | undefined | null;
  percentage?: number | undefined | null;
  onSale?: boolean | undefined | null;
}

export type newProduct = Omit<Product, 'id'>;
