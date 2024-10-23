import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import {
  DialogResult,
  MessageData,
  MessageType,
} from '../models/message.model';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';
import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
    standalone: true,
    imports: [
        MatDialogTitle,
        CdkScrollable,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        CapitalizePipe,
    ],
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
