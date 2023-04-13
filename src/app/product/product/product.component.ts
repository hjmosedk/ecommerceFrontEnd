import { Component} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSingleProduct } from '../state/selectors';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  public product$ = this.store.select(selectSingleProduct);
  constructor(private store: Store) {}
}
