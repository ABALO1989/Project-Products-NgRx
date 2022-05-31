import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../product.service';

import * as ProductActions from './product.action';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  //creacion de un efecto

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productService
          .getProducts()
          .pipe(
            map((products) => ProductActions.loadProductsSuccess({ products })),
            catchError(error=> of(ProductActions.loadProductsFailure({ error })))
          )
      )
    );
  });

  updateProduct$ = createEffect(()=>{
    return this.actions$.pipe( //se reponde a cualquier acccion enviada
      ofType(ProductActions.updateProduct), //especificamnete a accion de updateProduct
      concatMap(action=> //se usa concatMap para aplanar los dos observables tanto el que viene del servicio y el de la accion, ambos son obsercvables
        this.productService.updateProduct(action.product) //se llama al metodo updateProduct del servicio y se psa el producto asociado con las accion, esto emitie la solcitud http put
        .pipe(
          map(product => ProductActions.updateProductSuccess({ product}), //devuleve automaticamnete un observable
          catchError(error => of(ProductActions.updateProductFailure({ error})))) //catch error no lo hace por lo tanto hay que crear el observable con of
        )
      )
    )
  })
}
