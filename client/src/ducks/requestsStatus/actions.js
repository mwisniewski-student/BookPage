import types from "./types";

export const setBookRequestStatus = payload => ({
    type: types.SET_BOOK_REQUEST_STATUS,
    payload
})

export const setAuthorRequestStatus = payload => ({
    type: types.SET_AUTHOR_REQUEST_STATUS,
    payload
})

export const setAddressRequestStatus = payload => ({
    type: types.SET_ADDRESS_REQUEST_STATUS,
    payload
})
