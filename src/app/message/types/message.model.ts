export enum MessageType {
  success = 'success',
  error = 'error',
}
export interface MessageData {
  type: MessageType | null;
  title: string;
  messageText: string;
  status?: number;
  statusText?: string;
  stackTrace?: string | void;
}
