import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { DialogData, MessageType } from '../modal/modal.component';

@Component({
  selector: 'app-dialogcontainer',
  templateUrl: './dialogcontainer.component.html',
  styleUrls: ['./dialogcontainer.component.css'],
})
export class DialogcontainerComponent {
  success = {
    type: MessageType.success,
    title: 'Success',
    message: 'This is a success',
  };

  error = {
    type: MessageType.error,
    title: 'Error',
    message: 'This is an error message',
  };

  constructor(public dialog: MatDialog) {}

  openDialog(message: DialogData) {
    this.dialog.open(ModalComponent, {
      data: message,
    });
    console.log(message);
  }
}
