import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageData, MessageType } from '../types/message.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  messageType = MessageType;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) @Optional() public data: MessageData
  ) {}
}
