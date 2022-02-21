import types from "./types";
import * as _ from 'lodash';
import bookTypes from "../books/types";
import authorTypes from "../authors/types";

export const reviewsReucer = (entity, state,action) => {

    const actionEntities = action.payload[entity];
    const { actionType } = action.meta;

    switch(actionType){
        case types.CREATE_REVIEW:
            return{
                byId: { ...state.byId, ...actionEntities },
                allIds: [ ...state.allIds, ...Object.keys(actionEntities)]
            }
        case types.DELETE_REVIEW:
        case bookTypes.DELETE_BOOK:
        case authorTypes.DELETE_AUTHOR:
            return{
                byId: _.omit(state.byId, Object.keys(actionEntities)),
                allIds: state.allIds.filter(id => !Object.keys(actionEntities).includes(id))
            }
        case bookTypes.GET_BOOKS:
        case bookTypes.GET_ALL_BOOKS:
            return{
                byId: { ...state.byId, ...actionEntities},
                allIds: _.uniq([ ...state.allIds, ...Object.keys(actionEntities)])
            }
        default:
            return state;
    }

}
