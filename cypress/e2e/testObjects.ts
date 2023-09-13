import {
  ProductModel,
  CurrencyEnum,
} from '../../src/app/shared/models/product.model';

type newProduct = Omit<ProductModel, 'id'>;

export const diamondRingItem: newProduct = {
  name: 'Diamond Ring',
  sku: 'RNG-1',
  description: 'This is a diamond ring - This is some placeholder text!',
  category: 'Jewelry',
  price: 250000,
  currency: CurrencyEnum.DKK,
  image: '66de3cfd-3830-47d2-8ce3-bd622a6dbcf4.jpeg',
  quantity: 5,
  percentage: 0,
  onSale: false,
};

export const cheeseburgerItem: newProduct = {
  name: 'Cheeseburger',
  sku: 'CHE-1',
  description: 'This is a cheeseburger with a some text',
  category: 'Food',
  price: 4900,
  currency: CurrencyEnum.DKK,
  image: 'f1e4fce4-dc0a-4e70-a284-874180510703.jpeg',
  quantity: 10,
  percentage: 0,
  onSale: false,
};

export const glovesItem: newProduct = {
  name: 'Gloves',
  sku: 'GLV-1',
  description: 'This is a pair of gloves, they are on sale',
  category: 'Clothes',
  price: 100000,
  currency: CurrencyEnum.DKK,
  image: '860c9cc3-9714-4cb5-a00f-e27f1a90d397.jpeg',
  quantity: 10,
  percentage: 20,
  onSale: true,
};

export const goldWatchItem: newProduct = {
  name: 'Gold Watch',
  sku: 'GLW-1',
  description: 'This is a golden watch to be used for checking the clock',
  category: 'Jewelry',
  price: 350000,
  currency: CurrencyEnum.DKK,
  image: '7c130b1d-1a71-4511-8637-266224cf1db5',
  quantity: 10,
  percentage: 20,
  onSale: true,
};

export const testProducts: newProduct[] = [
  diamondRingItem,
  glovesItem,
  cheeseburgerItem,
];

export const loremIpsum: string =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper morbi tincidunt ornare massa eget egestas purus viverra accumsan. Magnis dis parturient montes nascetur ridiculus mus mauris vitae. Quis vel eros donec ac odio tempor. Eget velit aliquet sagittis id consectetur purus ut faucibus pulvinar.';
