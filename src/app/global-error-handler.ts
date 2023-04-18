import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { ErrorService } from './services/error.service';
import { MessageService } from './message/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageData, MessageType } from './message/types/message.model';
@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const message = this.injector.get(MessageService);

    let systemMessage;
    let stackTrace;
    let systemError;

    if (error instanceof HttpErrorResponse) {
      systemError = errorService.getServerSideError(error);
      const serverErrorMessage: MessageData = {
        type: MessageType.error,
        title: `Oops - An error of ${systemError.statusText} - ${systemError.status} have occurred`,
        messageText: systemError.message,
        status: systemError.status,
        statusText: systemError.statusText,
      };
      message.sendSystemMessage(serverErrorMessage);
    } else {
      systemMessage = errorService.getClientSideErrorMessage(error);
      stackTrace = errorService.getClientSideStack(error);
      const clientErrorMessage: MessageData = {
        type: MessageType.error,
        title: 'Oops - Something went wrong on your end!',
        messageText: systemMessage,
        stackTrace: stackTrace,
      };

      message.sendSystemMessage(clientErrorMessage);
    }
  }
}
