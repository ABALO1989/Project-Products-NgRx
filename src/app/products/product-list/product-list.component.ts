import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { Product } from '../product';
import {
  getCurrentProduct,
  getError,
  getProducts,
  getShowProductCode,
  State,
} from '../state/product.reducer';
import * as ProductActions from '../state/product.action';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;

  //2.4 inyectar la store en el componente
  constructor(
    private store: Store<State>,
  ) {}

  ngOnInit(): void {
    this.products$ = this.store.select(getProducts);

    this.errorMessage$ = this.store.select(getError);

    this.store.dispatch(ProductActions.loadProducts());

    this.selectedProduct$ = this.store.select(getCurrentProduct);

    this.displayCode$ = this.store.select(getShowProductCode); //2.5 usar la funcion select, para pasar el segmento de estado deseado, en este caso products
  }

  //2.5 responder a la accion. dispatch de la store
  checkChanged(): void {
    this.store.dispatch(
      ProductActions.toggleProductCode() //pasar la accion al dispacth
    );
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initializeCurrentProduct());
    //this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({ currentProductId: product.id }));
  }
}
