import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { ErrorService } from './services/error.service';
import { MessageService } from './message/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogData, MessageType } from './message/modal/modal.component';

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
      const serverErrorMessage: DialogData = {
        type: MessageType.error,
        title: `Oops - ${systemError.status} error have occurred`,
        message: systemError.message,
        status: systemError.status,
        statusText: systemError.statusText,
      };
      message.sendSystemMessage(serverErrorMessage);
    } else {
      systemMessage = errorService.getClientSideErrorMessage(error);
      stackTrace = errorService.getClientSideStack(error);
      const clientErrorMessage: DialogData = {
        type: MessageType.error,
        title: 'Oops - Something went wrong on your end!',
        message: systemMessage,
        stackTrace: stackTrace,
      };

      message.sendSystemMessage(clientErrorMessage);
    }
  }
}
