import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MessageData, MessageType } from '../models/message.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  messageType = MessageType;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) @Optional() public data: MessageData,
    private dialog: MatDialog
  ) {}

  onClose() {
    this.dialog.closeAll();
  }
}
