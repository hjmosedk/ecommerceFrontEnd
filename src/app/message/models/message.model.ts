import { ProductModel } from 'src/app/shared/models/product.model';

export enum MessageType {
  success = 'success',
  error = 'error',
  update = 'update',
}
export interface MessageData {
  type: MessageType | null;
  title: string;
  messageText: string;
  status?: number;
  statusText?: string;
  stackTrace?: string | void;
  product?: ProductModel;
}
