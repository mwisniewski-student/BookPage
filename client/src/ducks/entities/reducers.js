import * as _ from 'lodash';
import types from "./types";
import { booksReducer } from '../books/reducer';
import { authorsReducer } from '../authors/reducer';
import { reviewsReucer } from '../reviews/reducer';

const allEntities = [
    "books",
    'authors',
    'reviews'
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

    if(entity === 'books'){
        return booksReducer(entity,state,action);
    }

    if(entity === 'authors'){
        return authorsReducer(entity,state,action)
    }

    if(entity === 'reviews'){
        return reviewsReucer(entity,state,action)
    }
    
    // switch (actionType) {
    //     case types.GET_ALL:
    //         return {
    //             byId: { ...actionEntities },
    //             allIds: Object.keys(actionEntities)
    //         }
    //     case types.CREATE:
    //         return {
    //             byId: { ...state.byId, ...actionEntities },
    //             allIds: _.uniq([...state.allIds, ...Object.keys(actionEntities)])
    //         }
    //     case types.DELETE:
    //         return {
    //             byId: _.omit(state.byId, Object.keys(actionEntities)),
    //             allIds: state.allIds.filter(id => !Object.keys(actionEntities).includes(id))
    //         }
    //     case types.UPDATE:
    //         return {
    //             byId: {
    //                 ..._.omit(state.byId, Object.keys(actionEntities)),
    //                 ...actionEntities
    //             },
    //             allIds: _.uniq([...state.allIds, ...Object.keys(actionEntities)])
    //         }
    //     case types.GET_ONE:
    //         return {
    //             byId: { ...state.byId, ...actionEntities },
    //             allIds: _.uniq([...state.allIds, ...Object.keys(actionEntities)])
    //         }
    //     case types.GET_MANY:
    //         return {
    //             byId: { ...state.byId, ...actionEntities },
    //             allIds: _.uniq([...state.allIds, ...Object.keys(actionEntities)])
    //         }
    //     default:
    //         return state;
    // }
}

export const entities = (state = defaultState, action) => {
    if (!action.meta || !action.meta.actionType) return state;
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