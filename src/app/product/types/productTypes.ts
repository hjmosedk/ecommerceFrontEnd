import { Currency } from 'dinero.js';

export interface Product {
  id: number;
  name: string;
  sku: string;
  description: string;
  price: number;
  currency: Currency;
  picture: string;
  quantity: number;
  brand: string;
  percentage: number;
  onSale: boolean;
}
