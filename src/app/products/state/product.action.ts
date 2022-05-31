import { createAction, props } from '@ngrx/store';
import { Product } from '../product';

//contruccion de acciones

export const toggleProductCode = createAction(
    '[Product] Toggle Product Code'
);

export const setCurrentProduct = createAction (
    '[Product] Set Current Product',
    props<{ currentProductId: number} >() 
    //este parametro  props es por que la accion tiene datos asociados, es decir la accion de establecer 
    //el producto actual requiere una referencia del producto seleccionado
    
);

export const clearCurrentProduct = createAction(
    '[Product] Clear Current Product'
);

export const initializeCurrentProduct = createAction(
    '[Product] Inicizalize Current Product'
);

export const loadProducts = createAction(
    '[Product] Load'
);

export const loadProductsSuccess = createAction(
    '[Product] Load Succes',
    props<{ products: Product[]}>()
); 

export const loadProductsFailure = createAction(
    '[Product] Load Fail',
    props<{error: string}>()
);

//accion que se inicia cuando el usuario da click en guardar al actulizar un producto
//luego se envia al reducer,y luego al effect y ese hace la solicud al server httpPUT
//inicia guardado en el backend
export const updateProduct = createAction(
    '[Product] Update Product',
    props<{product: Product}>() //esto es lo que envia la accion, el objeto del product aculziado
);


//Esta es la Acción de la culminacion exitosa de la operacion y
// que se despachara desde el reductor si el guadardo en el backend es exitoso
export const updateProductSuccess = createAction( //
    '[Product] Update Product Success',
    props<{ product: Product }>()
);

export const updateProductFailure = createAction(
    '[Product] Update Product Fail',
    props<{ error : string }>()
)



