import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { MessageEffects } from './state/effects';

@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    //MatDialogModule,
    EffectsModule.forFeature([MessageEffects]),
    SharedModule,
  ],
})
export class MessageModule {}
