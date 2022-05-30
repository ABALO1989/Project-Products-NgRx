import { createAction, createReducer, on } from '@ngrx/store';

export const userReducer = createReducer(
    {showNameUser: false},
    on(createAction('[User] Toggle User Name'), state => {
        console.log('Original state: ' + JSON.stringify(state));
        return {
            ...state,
            showNameUser: !state.showNameUser
        };
    })
)