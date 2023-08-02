import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UpdateProductModel } from '../models/updateProduct.model';

@Component({
  selector: 'app-update-product-modal',
  templateUrl: './update-product-modal.component.html',
  styleUrls: ['./update-product-modal.component.css'],
})
export class UpdateProductModalComponent {
  constructor(
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    @Optional()
    public data: UpdateProductModel,
    private dialog: MatDialog
  ) {}

  onClose() {
    this.dialog.closeAll();
  }
}
