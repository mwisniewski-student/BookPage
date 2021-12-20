import { createAction } from "redux-api-middleware";
import { schema, normalize } from 'normalizr';
import types from "../entities/types";
import loadingTypes from "../loading/types";

const bookSchema = new schema.Entity('books');
const booksSchema = new schema.Array(bookSchema);

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
                meta: { actionType: types.GET_ALL }
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
                    const { entities } = normalize(bookToDelete, bookSchema);
                    console.log('Normalized Entities', entities);
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