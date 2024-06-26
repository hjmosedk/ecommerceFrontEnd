import { MessageService } from 'src/app/message/message.service';
import { Component, Inject, OnInit, Optional } from '@angular/core';
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
import { filter, Observable } from 'rxjs';
import { OrderModel } from 'ckh-typings/dist/ecommerce';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  messageType = MessageType;
  orderObservable$!: Observable<OrderModel | undefined> | undefined;

  constructor(
    @Optional() public dialogRef: MatDialogRef<ModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) @Optional() public data: MessageData,
    private dialog: MatDialog,
    private messageService: MessageService
  ) {}

  onClose() {
    this.dialog.closeAll();
  }

  onAccept() {
    this.dialogRef.close(DialogResult.ok);
  }

  ngOnInit(): void {
    this.orderObservable$ = this.messageService
      .getOrderInStore()
      .pipe(filter((order) => order !== undefined));
  }
}
