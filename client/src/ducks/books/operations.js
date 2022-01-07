import { createAction } from "redux-api-middleware";
import { schema, normalize } from 'normalizr';
import types from "../entities/types";
import loadingTypes from "../loading/types";

const reviewSchema = new schema.Entity('reviews');
const bookSchema = new schema.Entity('books', {
    reviews: [reviewSchema]
});
const booksSchema = new schema.Array(bookSchema);
const authorSchema = new schema.Entity('authors');
const authorsSchema = new schema.Array(authorSchema);

export const getBookList = () => {
    return createAction({
        endpoint: 'http://localhost:5000/books',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            loadingTypes.REQUEST,
            {
                type: loadingTypes.SUCCESS,
                payload: async (_action, _state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, booksSchema)
                    return entities;
                },
                meta: { actionType: types.GET_MANY }
            },
            loadingTypes.FAILURE
        ]
    })
}

export const getOneBook = id => {
    return createAction({
        endpoint: `http://localhost:5000/books/${id}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            loadingTypes.REQUEST,
            {
                type: loadingTypes.SUCCESS,
                payload: async (_action, _state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, bookSchema)
                    return entities;
                },
                meta: { actionType: types.GET_ONE }
            },
            loadingTypes.FAILURE
        ]
    })
}

export const getBooksByAuthorRequest = id => {
    return createAction({
        endpoint: `http://localhost:5000/books/by-author/${id}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            loadingTypes.REQUEST,
            {
                type: loadingTypes.SUCCESS,
                payload: async (_action, _state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, booksSchema)
                    return entities;
                },
                meta: { actionType: types.GET_MANY }
            },
            loadingTypes.FAILURE
        ]
    })
}

export const getBooksAuthors = bookId => {
    return createAction({
        endpoint: `http://localhost:5000/books/${bookId}/authors`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            loadingTypes.REQUEST,
            {
                type: loadingTypes.SUCCESS,
                payload: async (_action, _state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, authorsSchema)
                    return entities;
                },
                meta: { actionType: types.GET_MANY }
            },
            loadingTypes.FAILURE
        ]
    })
}

export const createBook = bookToAdd => {
    return createAction({
        endpoint: `http://localhost:5000/books`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookToAdd),
        types: [
            loadingTypes.REQUEST,
            {
                type: loadingTypes.SUCCESS,
                payload: async (action, state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, bookSchema);
                    return entities;
                },
                meta: { actionType: types.CREATE }
            },
            loadingTypes.FAILURE,
        ]
    })
}

export const deleteBook = bookToDelete => {
    return createAction({
        endpoint: `http://localhost:5000/books/${bookToDelete.id}`,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            loadingTypes.REQUEST,
            {
                type: loadingTypes.SUCCESS,
                payload: async (action, state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, bookSchema);
                    return entities;
                },
                meta: { actionType: types.DELETE }
            },
            loadingTypes.FAILURE,
        ]
    })
}

export const updateBook = bookToUpdate => {
    return createAction({
        endpoint: `http://localhost:5000/books/${bookToUpdate.id}`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookToUpdate),
        types: [
            loadingTypes.REQUEST,
            {
                type: loadingTypes.SUCCESS,
                payload: async (_action, _state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, bookSchema);
                    return entities;
                },
                meta: { actionType: types.UPDATE }
            },
            loadingTypes.FAILURE,
        ]
    })
}