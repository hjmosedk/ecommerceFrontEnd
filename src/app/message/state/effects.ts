import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { MessageActions } from '../state/actions';
import { map } from 'rxjs';
import { ProductsActions } from 'src/app/product/state/actions';
import { MessageType } from '../models/message.model';
import { MessageService } from '../message.service';

@Injectable()
export class MessageEffects {
  constructor(
    private actions: Actions,
    public dialog: MatDialog,
    private messageService: MessageService
  ) {}

  /*sendSystemMessage = createEffect(
    () => {
      return this.actions.pipe(
        ofType(ProductsActions.createProductSuccess),
        map(({ product }) => {
          this.dialog.open(ModalComponent, {
            data: {
              type: MessageType.success,
              title: 'Success',
              messageText: `You have successfully added the product ${product.name} with SKU: ${product.sku}`,
            },
          });
        })
      );
    },
    { dispatch: false }
  );
*/

  sendSystemMessage = createEffect(
    () => {
      return this.actions.pipe(
        ofType(ProductsActions.createProductSuccess),
        map(({ product }) => {
          this.messageService.sendSystemMessage({
            type: MessageType.success,
            title: 'Success',
            messageText: `You have successfully added the product ${product.name} with SKU: ${product.sku}`,
          });
        })
      );
    },
    { dispatch: false }
  );
}
