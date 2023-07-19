export enum CurrencyType {
  DKK = 'DKK',
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  currency: CurrencyType;
  image: string;
  quantity: number;
  category: string;
  percentage: number;
  onSale: boolean;
}

export type NewProduct = Omit<Product, 'id'>;
