export enum MessageType {
  success = 'SUCCESS',
  error = 'ERROR',
  warning = 'WARNING',
  update = 'UPDATE',
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
