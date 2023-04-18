import { createActionGroup, props } from '@ngrx/store';
import { MessageData } from '../types/message.model';

export const MessageActions = createActionGroup({
  source: 'Message',
  events: {
    'Send System Message': props<{ message: MessageData }>(),
  },
});
