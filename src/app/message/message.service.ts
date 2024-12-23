import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { MessageData } from './models/message.model';
import { Store } from '@ngrx/store';
import { selectOrder } from '../orders/state/order.selectors';
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private dialog: MatDialog, private store: Store) {}

  dialogResult: any;

  sendSystemMessage(message: MessageData) {
    return this.dialog.open(ModalComponent, { data: message });
  }

  getOrderInStore() {
    const selectedOrder = this.store.select(selectOrder);
    return selectedOrder;
  }
}
