import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { MessageData } from './models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private dialog: MatDialog) {}

  sendSystemMessage(message: MessageData) {
    this.dialog.open(ModalComponent, { data: message });
  }
}
