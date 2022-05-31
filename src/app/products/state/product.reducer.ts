import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Product } from '../product';
//esto se hace para que interfiera con la reporduccion modular de los porductos
import * as AppState from '../../state/app.state';
import * as ProductActions from './product.action';
import { Action } from 'rxjs/internal/scheduler/Action';


export interface State extends AppState.State {
 products: ProductState;
};

//3 tipado de las partes del estado
//se crea un ainterface para cada parte de una de las secciones del estado


export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null ;
    products: Product[];
    error: string;

};


//aginacion de valor inicial
const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: ''
}


//CS.creacion de selectores
// CS1. primero agrego en una variable a que seccion del estado voy a seleccionar
const getProductFeactureState = createFeatureSelector<ProductState>('products');

//CS segundo defino a que oarte de esta seccion voy a apuntar y por lo tanto es la que se va a actulizar en el store
export const getShowProductCode = createSelector(
    getProductFeactureState,
    state=> state.showProductCode
);

export const getCurrentProductId = createSelector(
    getProductFeactureState,
    state=> state.currentProductId
);

export const getCurrentProduct = createSelector(
    getProductFeactureState,
    getCurrentProductId,
    (state, currentProductId)=>{
        if(currentProductId === 0){
            return{
                id:0,
                productName:'',
                productCode:'New',
                description:'',
                starRating:0
            };
        }else {
            return currentProductId ? state.products.find(p=> p.id === currentProductId): null
        }
    }
);

export const getProducts = createSelector(
    getProductFeactureState,
    state=> state.products
);

export const getError = createSelector(
    getProductFeactureState,
    state=>state.error
);

//2.3 crear reducer y la accion 
export const productReducer = createReducer<ProductState>(
    initialState,
    on(ProductActions.toggleProductCode, (state): ProductState => {
        console.log('Original state: ' + JSON.stringify(state));
        return {
            ...state,
            showProductCode: !state.showProductCode
        };
    }),
    on(ProductActions.setCurrentProduct, (state, action): ProductState => {
        console.log('Original state: ' + JSON.stringify(state));
        return {
            ...state,
            currentProductId: action.currentProductId
        };
    }),
    on(ProductActions.clearCurrentProduct, (state): ProductState=> {
        return {
            ...state,
            currentProductId: null
        };
    }),
    on(ProductActions.initializeCurrentProduct, (state): ProductState=> {
        return {
            ...state,
            currentProductId: 0
        };
    }), 
    on(ProductActions.loadProductsSuccess, (state, action): ProductState =>{
        return {
            ...state,
            products: action.products,
            error:''
        }
    }),
    on(ProductActions.loadProductsFailure, (state, action): ProductState =>{
        return {
            ...state,
            products:[],
            error: action.error
        }
    }),
    // las acciones de exito y falla de las operaciones asincronas (que hacen llamadas al backend), se manejan en el effect pero las acciones de exito y falal se manejan en el reductor
    on(ProductActions.updateProductSuccess, (state, action): ProductState =>{
        const updateProducts = state.products.map(
            item => action.product.id === item.id ? action.product : item);
            return {
                ...state,
                products: updateProducts,
                currentProductId: action.product.id,
                error:''
            };
        }),
    on(ProductActions.updateProductFailure, (state, action): ProductState=> {
        return {
            ...state,
            error: action.error
        }
    })


);
