import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { DialogData } from './modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private dialog: MatDialog) {}

  sendSystemMessage(message: DialogData) {
    this.dialog.open(ModalComponent, { data: message });
  }
}
