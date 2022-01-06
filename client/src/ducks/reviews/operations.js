import { createAction } from "redux-api-middleware";
import { schema, normalize } from 'normalizr';
import types from "../entities/types";
import loadingTypes from "../loading/types";

const reviewSchema = new schema.Entity('reviews');
const bookSchema = new schema.Entity('books', {
    reviews: [reviewSchema]
});

export const createReview = (bookId, reviewToAdd) => {
    return createAction({
        endpoint: `http://localhost:5000/books/${bookId}/reviews`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewToAdd),
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

export const deleteReview = (bookId, reviewId) => {
    return createAction({
        endpoint: `http://localhost:5000/books/${bookId}/reviews/${reviewId}`,
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
                    const { entities } = normalize(json, reviewSchema);
                    return entities;
                },
                meta: { actionType: types.DELETE }
            },
            loadingTypes.FAILURE,
        ]
    })
}