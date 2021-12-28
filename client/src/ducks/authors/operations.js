import { createAction } from "redux-api-middleware";
import { schema, normalize } from 'normalizr';
import types from "../entities/types";
import loadingTypes from "../loading/types";

const authorSchema = new schema.Entity('authors');
const authorsSchema = new schema.Array(authorSchema);

export const getAuthorList = () => {
    return createAction({
        endpoint: 'http://localhost:5000/authors',
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
                meta: { actionType: types.GET_ALL }
            },
            loadingTypes.FAILURE
        ]
    })
}

export const getOneAuthor = id => {
    return createAction({
        endpoint: `http://localhost:5000/authors/${id}`,
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
                    const { entities } = normalize(json, authorSchema)
                    return entities;
                },
                meta: { actionType: types.GET_ONE }
            },
            loadingTypes.FAILURE
        ]
    })
}

export const createAuthor = authorToAdd => {
    return createAction({
        endpoint: `http://localhost:5000/authors`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authorToAdd),
        types: [
            loadingTypes.REQUEST,
            {
                type: loadingTypes.SUCCESS,
                payload: async (action, state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, authorSchema);
                    return entities;
                },
                meta: { actionType: types.CREATE }
            },
            loadingTypes.FAILURE,
        ]
    })
}

export const deleteAuthor = authorToDelete => {
    return createAction({
        endpoint: `http://localhost:5000/authors/${authorToDelete.id}`,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            loadingTypes.REQUEST,
            {
                type: loadingTypes.SUCCESS,
                payload: async (action, state, res) => {
                    const { entities } = normalize(authorToDelete, authorSchema);
                    return entities;
                },
                meta: { actionType: types.DELETE }
            },
            loadingTypes.FAILURE,
        ]
    })
}

export const updateAuthor = authorToUpdate => {
    return createAction({
        endpoint: `http://localhost:5000/authors/${authorToUpdate.id}`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authorToUpdate),
        types: [
            loadingTypes.REQUEST,
            {
                type: loadingTypes.SUCCESS,
                payload: async (_action, _state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, authorSchema);
                    return entities;
                },
                meta: { actionType: types.UPDATE }
            },
            loadingTypes.FAILURE,
        ]
    })
}