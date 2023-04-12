import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';




export interface customError {
  status: number
  statusText: string
  message: string
}



@Injectable({
  providedIn: 'root'
})

export class ErrorService {

  constructor() { }

  getClientSideErrorMessage(error: Error): string {
    if(!navigator.onLine) {
      return "No internet connecting detected - Please try again or contact support";
    }

    return error.message ? error.message : error.toString(); 
  }


  getClientSideStack(error: Error): string | void  {
    if(!error.stack) {
      return 
    }
    return error.stack;
  }

  getServerSideError (error: HttpErrorResponse): customError {
    
    
    return {status: error.status, statusText: error.statusText, message: error.message}; 
  }


}
