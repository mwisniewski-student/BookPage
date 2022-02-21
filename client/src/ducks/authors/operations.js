import { createAction } from "redux-api-middleware";
import { schema, normalize } from 'normalizr';
import types from "./types";
import loadingTypes from "./loadingTypes";
import { getBooksByAuthor } from '../books/selectors';
import { getReviewsFromBook } from "../reviews/selectors";

const authorSchema = new schema.Entity('authors');
const authorsSchema = new schema.Array(authorSchema);
const bookSchema = new schema.Entity('books');
const booksSchema = new schema.Array(bookSchema);
const reviewSchema = new schema.Entity('reviews');
const reviewsSchema = new schema.Array(reviewSchema)

export const getAuthorList = () => {
    return createAction({
        endpoint: 'http://localhost:5000/authors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            loadingTypes.GET_ALL_AUTHORS_REQUEST,
            {
                type: loadingTypes.GET_ALL_AUTHORS_SUCCESS,
                payload: async (_action, _state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, authorsSchema)
                    return entities;
                },
                meta: { actionType: types.GET_ALL_AUTHORS }
            },
            loadingTypes.GET_ALL_AUTHORS_FAILURE
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
            loadingTypes.GET_ONE_AUTHOR_REQUEST,
            {
                type: loadingTypes.GET_ONE_AUTHOR_SUCCESS,
                payload: async (_action, _state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, authorSchema)
                    return entities;
                },
                meta: { actionType: types.GET_AUTHORS }
            },
            loadingTypes.GET_ONE_AUTHOR_FAILURE
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
            loadingTypes.CREATE_AUTHOR_REQUEST,
            {
                type: loadingTypes.CREATE_AUTHOR_SUCCESS,
                payload: async (action, state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, authorSchema);
                    return entities;
                },
                meta: { actionType: types.CREATE_AUTHOR }
            },
            loadingTypes.CREATE_AUTHOR_FAILURE,
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
            loadingTypes.DELETE_AUTHOR_REQUEST,
            {
                type: loadingTypes.DELETE_AUTHOR_SUCCESS,
                payload: async (_action, state, _res) => {
                    const bookEntities = normalize(getBooksByAuthor(state, authorToDelete.id), booksSchema).entities;
                    const authorEntity = normalize(authorToDelete, authorSchema).entities;
                    const bookIds = Object.keys(bookEntities).books ? Object.keys(bookEntities.books) : [];
                    const reviews = bookIds.map(bookId => getReviewsFromBook(state,bookId)).flat();
                    const reviewEntities = normalize(reviews,reviewsSchema).entities;
                    return { ...bookEntities, ...authorEntity, ...reviewEntities };
                },
                meta: { actionType: types.DELETE_AUTHOR }
            },
            loadingTypes.DELETE_AUTHOR_FAILURE,
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
            loadingTypes.UPDATE_AUTHOR_REQUEST,
            {
                type: loadingTypes.UPDATE_AUTHOR_SUCCESS,
                payload: async (_action, _state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, authorSchema);
                    return entities;
                },
                meta: { actionType: types.UPDATE_AUTHOR }
            },
            loadingTypes.UPDATE_AUTHOR_FAILURE,
        ]
    })
}

export const getAuthorsByBook = bookId => {
    return createAction({
        endpoint: `http://localhost:5000/books/${bookId}/authors`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            loadingTypes.GET_AUTHORS_BY_BOOK_REQUEST,
            {
                type: loadingTypes.GET_AUTHORS_BY_BOOK_SUCCESS,
                payload: async (_action, _state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, authorsSchema)
                    return entities;
                },
                meta: { actionType: types.GET_AUTHORS }
            },
            loadingTypes.GET_AUTHORS_BY_BOOK_FAILURE
        ]
    })
}