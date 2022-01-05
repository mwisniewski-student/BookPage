import types from './types'

const initState = {
    hasBookRequestHappend: false,
    hasAuthorRequestHappend: false,
    hasAddressRequestHappend: false
}
const requestsStatusReducer = (state = initState, action) => {
    switch (action.type) {
        case types.SET_BOOK_REQUEST_STATUS:
            return { ...state, hasBookRequestHappend: action.payload }
        case types.SET_AUTHOR_REQUEST_STATUS:
            return { ...state, hasAuthorRequestHappend: action.payload }
        case types.SET_ADDRESS_REQUEST_STATUS:
            return { ...state, hasAddressRequestHappend: action.payload }
        default:
            return state
    }
}

export default requestsStatusReducer