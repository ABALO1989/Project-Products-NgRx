import { createAction, createReducer, on } from '@ngrx/store';
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

const initialState: ProductState = {
    showProductCode: true,
    currentProduct: null,
    products: []
}



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
