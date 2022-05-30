import { createAction, createReducer, on } from '@ngrx/store';


//2.3 crear reducer y la accion 
export const productReducer = createReducer(
    { showProductCode: true},
    on(createAction('[Product] Toggle Product Code'), state => {
        console.log('Original state: ' + JSON.stringify(state));
        return {
            ...state,
            showProductCode: !state.showProductCode
        };
    })
);
