import { createAction } from "redux-api-middleware";
import { schema, normalize } from 'normalizr';
import types from "./types";
import loadingTypes from "./loadingTypes";
import { getReviewById } from "./selectors";

const reviewSchema = new schema.Entity('reviews');
const bookSchema = new schema.Entity('books', {
    reviews: [reviewSchema]
});

const serverDomain = process.env.REACT_APP_SERVER_DOMAIN;

export const createReview = (bookId, reviewToAdd) => {
    return createAction({
        endpoint: serverDomain + `/books/${bookId}/reviews`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewToAdd),
        types: [
            loadingTypes.CREATE_REVIEW_REQUEST,
            {
                type: loadingTypes.CREATE_REVIEW_SUCCESS,
                payload: async(action, state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, bookSchema);
                    return entities;
                },
                meta: { actionType: types.CREATE_REVIEW }
            },
            loadingTypes.CREATE_REVIEW_FAILURE,
        ]
    })
}

export const deleteReview = (bookId, reviewId) => {
    return createAction({
        endpoint: serverDomain + `/books/${bookId}/reviews/${reviewId}`,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            loadingTypes.DELETE_REVIEW_REQUEST,
            {
                type: loadingTypes.DELETE_REVIEW_SUCCESS,
                payload: async(_action, state, res) => {
                    const json = await res.json();
                    console.log(json)
                    const bookEntity = normalize(json, bookSchema).entities;
                    const reviewEntity = normalize(getReviewById(state, reviewId), reviewSchema).entities;
                    return {...bookEntity, ...reviewEntity };
                },
                meta: { actionType: types.DELETE_REVIEW }
            },
            loadingTypes.DELETE_REVIEW_FAILURE,
        ]
    })
}