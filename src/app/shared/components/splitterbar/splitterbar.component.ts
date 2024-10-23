import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-splitterbar',
    templateUrl: './splitterbar.component.html',
    styleUrls: ['./splitterbar.component.css'],
    standalone: true,
    imports: [MatToolbar, MatButton],
})
export class SplitterbarComponent {
  categories = ['Computer', 'Clothes', 'Food', 'Electronics', 'Jewelry'];

  constructor() {}
}
