import { createAction, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { ProductState } from 'src/app/products/state/product.reducer';

export interface UserState {
    showNameUser: boolean;
}


const initialState: UserState = {
    showNameUser: false
}

const getUserFeactureState = createFeatureSelector<UserState>('user');

export const getShowNameUser = createSelector(
    getUserFeactureState,
    state=> state.showNameUser
);




export const userReducer = createReducer<UserState>(
    initialState,
    on(createAction('[User] Toggle User Name'), (state): UserState => {
        console.log('Original state: ' + JSON.stringify(state));
        return {
            ...state,
            showNameUser: !state.showNameUser
        };
    })
)