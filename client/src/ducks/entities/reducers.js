import * as _ from 'lodash';
import types from "./types";

const allEntities = [
    "books",
    'authors',
    'addresses'
];

const defaultState = allEntities.reduce(
    (acc, entity) => ({
        ...acc,
        [entity]: {
            byId: {},
            allIds: []
        }
    }), {}
);

const entityReducer = (entity, state = { allIds: [], byId: {} }, action) => {
    const actionEntities = action.payload[entity];
    const { actionType } = action.meta;

    switch (actionType) {
        case types.GET_ALL:
            return {
                byId: { ...actionEntities },
                allIds: Object.keys(actionEntities)
            }
        case types.CREATE:
            return {
                byId: { ...state.byId, ...actionEntities },
                allIds: [...state.allIds, ...Object.keys(actionEntities)]
            }
        case types.DELETE:
            return {
                byId: _.omit(state.byId, Object.keys(actionEntities)),
                allIds: state.allIds.filter(id => !Object.keys(actionEntities).includes(id)),
            }
        case types.UPDATE:
            return {
                byId: {
                    ..._.omit(state.byId, Object.keys(actionEntities)),
                    ...actionEntities
                },
                allIds: state.allIds
            }
        default:
            return state;
    }
}

export const entities = (state = defaultState, action) => {
    if (!action.meta || !action.meta.actionType) return state;

    console.log(action);
    return {
        ...state,
        ...Object.keys(action.payload).reduce(
            (acc, entity) => ({
                ...acc,
                [entity]: entityReducer(entity, state[entity], action)
            }), {}
        ),
    }
}