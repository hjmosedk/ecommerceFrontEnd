import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export enum MessageType {
  success = 'success',
  error = 'error',
}
export interface DialogData {
  type: MessageType | null;
  title: string;
  message: string;
  status?: number;
  statusText?: string;
  stackTrace?: string | void;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  messageType = MessageType;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) @Optional() public data: DialogData
  ) {}
}
