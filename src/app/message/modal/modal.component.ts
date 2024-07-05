import { MessageService } from 'src/app/message/message.service';
import { Component, Inject, Optional } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  DialogResult,
  MessageData,
  MessageType,
} from '../models/message.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  messageType = MessageType;

  constructor(
    @Optional() public dialogRef: MatDialogRef<ModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) @Optional() public data: MessageData,
    private dialog: MatDialog
  ) {}

  onClose() {
    this.dialog.closeAll();
  }

  onAccept() {
    this.dialogRef.close(DialogResult.ok);
  }
}
