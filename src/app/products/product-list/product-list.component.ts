import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';


@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  //2.4 inyectar la store en el componente
  constructor(private store:Store<any>, 
    private productService: ProductService) { }

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: err => this.errorMessage = err
    });

    //2.5 usar la funcion select, para pasar el segmento de estado deseado, en este caso products

    this.store.select('products').subscribe(
      products=> {
        if(products){
          this.displayCode = products.showProductCode;
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  //2.5 responder a la accion. dispatch de la store
  checkChanged(): void {
    this.store.dispatch(
      { type :'[Product] Toggle Product Code'} //pasar la accion al dispacth
    );
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
  }

}
