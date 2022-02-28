import { createAction } from "redux-api-middleware";
import { schema, normalize } from 'normalizr';
import types from "./types";
import loadingTypes from "./loadingTypes";

const reviewSchema = new schema.Entity('reviews');
const bookSchema = new schema.Entity('books', {
    reviews: [reviewSchema]
});
const booksSchema = new schema.Array(bookSchema);

const serverDomain = process.env.REACT_APP_SERVER_DOMAIN;

export const getBookList = () => {
    return createAction({
        endpoint: serverDomain + '/books',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            loadingTypes.GET_ALL_BOOKS_REQUEST,
            {
                type: loadingTypes.GET_ALL_BOOKS_SUCCESS,
                payload: async(_action, _state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, booksSchema)
                    return entities;
                },
                meta: { actionType: types.GET_ALL_BOOKS }
            },
            loadingTypes.GET_ALL_BOOKS_FAILURE
        ]
    })
}

export const getOneBook = id => {
    return createAction({
        endpoint: serverDomain + `/books/${id}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            loadingTypes.GET_ONE_BOOK_REQUEST,
            {
                type: loadingTypes.GET_ONE_BOOK_SUCCESS,
                payload: async(_action, _state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, bookSchema)
                    return entities;
                },
                meta: { actionType: types.GET_BOOKS }
            },
            loadingTypes.GET_ONE_BOOK_SUCCESS
        ]
    })
}

export const getBooksByAuthorRequest = id => {
    return createAction({
        endpoint: serverDomain + `/books/by-author/${id}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            loadingTypes.GET_BOOKS_BY_AUTHOR_REQUEST,
            {
                type: loadingTypes.GET_BOOKS_BY_AUTHOR_SUCCESS,
                payload: async(_action, _state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, booksSchema)
                    return entities;
                },
                meta: { actionType: types.GET_BOOKS }
            },
            loadingTypes.GET_BOOKS_BY_AUTHOR_FAILURE
        ]
    })
}

export const createBook = bookToAdd => {
    return createAction({
        endpoint: serverDomain + `/books`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookToAdd),
        types: [
            loadingTypes.CREATE_BOOK_REQUEST,
            {
                type: loadingTypes.CREATE_BOOK_SUCCESS,
                payload: async(action, state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, bookSchema);
                    return entities;
                },
                meta: { actionType: types.CREATE_BOOK }
            },
            loadingTypes.CREATE_BOOK_FAILURE,
        ]
    })
}

export const deleteBook = bookToDelete => {
    return createAction({
        endpoint: serverDomain + `/books/${bookToDelete.id}`,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            loadingTypes.DELETE_BOOK_REQUEST,
            {
                type: loadingTypes.DELETE_BOOK_SUCCESS,
                payload: async(action, state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, bookSchema);
                    return entities;
                },
                meta: { actionType: types.DELETE_BOOK }
            },
            loadingTypes.DELETE_BOOK_FAILURE,
        ]
    })
}

export const updateBook = bookToUpdate => {
    return createAction({
        endpoint: serverDomain + `/books/${bookToUpdate.id}`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookToUpdate),
        types: [
            loadingTypes.UPDATE_BOOK_REQUEST,
            {
                type: loadingTypes.UPDATE_BOOK_SUCCESS,
                payload: async(_action, _state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, bookSchema);
                    return entities;
                },
                meta: { actionType: types.UPDATE_BOOK }
            },
            loadingTypes.UPDATE_BOOK_FAILURE,
        ]
    })
}