export enum MessageType {
  success = 'success',
  error = 'error',
  warning = 'warning',
}
export interface MessageData {
  type: MessageType | null;
  title: string;
  messageText: string;
  status?: number;
  statusText?: string;
  stackTrace?: string | void;
}

export enum DialogResult {
  ok = 'OK',
}
