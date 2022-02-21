import types from "./types";

const initState = {
    loading: false,
    error: ''
}

export const loadingReducer = (state = initState, action) => {

    if(action.type.endsWith('_REQUEST')){
        return { ...state, loading: true }
    } 
    if(action.type.endsWith('_SUCCESS')){
        return { ...state, loading: false }
    }
    if(action.type.endsWith('_FAILURE')){
        return { ...state, loading: false, error: action.payload };
    }
    return state;
}

