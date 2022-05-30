import { createAction, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Product } from '../product';
//esto se hace para que interfiera con la reporduccion modular de los porductos
import * as AppState from '../../state/app.state';



export interface State extends AppState.State {
 products: ProductState;
};

//3 tipado de las partes del estado
//se crea un ainterface para cada parte de una de las secciones del estado


export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];

};


//aginacion de valor inicial
const initialState: ProductState = {
    showProductCode: true,
    currentProduct: null,
    products: []
}


//CS.creacion de selectores
// CS1. primero agrego en una variable a que seccion del estado voy a seleccionar
const getProductFeactureState = createFeatureSelector<ProductState>('products');

//CS segundo defino a que oarte de esta seccion voy a apuntar y por lo tanto es la que se va a actulizar en el store
export const getShowProductCode = createSelector(
    getProductFeactureState,
    state=> state.showProductCode
);

export const getCurrentProduct = createSelector(
    getProductFeactureState,
    state=>state.currentProduct
);

export const getProducts = createSelector(
    getProductFeactureState,
    state=> state.products
);

//2.3 crear reducer y la accion 
export const productReducer = createReducer<ProductState>(
    initialState,
    on(createAction('[Product] Toggle Product Code'), (state): ProductState => {
        console.log('Original state: ' + JSON.stringify(state));
        return {
            ...state,
            showProductCode: !state.showProductCode
        };
    })
);
