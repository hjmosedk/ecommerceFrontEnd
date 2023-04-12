import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { DialogcontainerComponent } from './dialogcontainer/dialogcontainer.component';

@NgModule({
  declarations: [ModalComponent, DialogcontainerComponent],
  imports: [CommonModule, MatDialogModule],
  exports: [DialogcontainerComponent],
})
export class MessageModule {}
