import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { SharedModule } from '../shared/shared.module';
//import { DialogcontainerComponent } from './dialogcontainer/dialogcontainer.component';

@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule, MatDialogModule, SharedModule],
  //exports: [DialogcontainerComponent],
})
export class MessageModule {}
