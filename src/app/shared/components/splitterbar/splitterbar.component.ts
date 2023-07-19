import { Component } from '@angular/core';

@Component({
  selector: 'app-splitterbar',
  templateUrl: './splitterbar.component.html',
  styleUrls: ['./splitterbar.component.css'],
})
export class SplitterbarComponent {
  categories = ['Computer', 'Clothes', 'Food', 'Electronics', 'Jewelry'];

  constructor() {}
}
