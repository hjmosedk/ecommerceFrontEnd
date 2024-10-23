import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { UpdateProductModel } from '../models/updateProduct.model';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
    selector: 'app-update-product-modal',
    templateUrl: './update-product-modal.component.html',
    styleUrls: ['./update-product-modal.component.css'],
    standalone: true,
    imports: [
        MatDialogTitle,
        CdkScrollable,
        MatDialogContent,
        ProductFormComponent,
    ],
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
