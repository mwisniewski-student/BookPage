import types from "./types";

const initState = {
    loading: false,
    error: ''
}

export const loadingReducer = (state = initState, action) => {
    switch (action.type) {
        case types.REQUEST:
            return { ...state, loading: true }
        case types.SUCCESS:
            return { ...state, loading: false }
        case types.FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

