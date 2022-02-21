import types from "./types";
import * as _ from 'lodash';
import authorsTypes from "../authors/types";
import reviewsTypes from "../reviews/types";

export const booksReducer = (entity,state,action) => {

    const actionEntities = action.payload[entity];
    const { actionType } = action.meta;

    switch(actionType){
        case types.GET_ALL_BOOKS:
            return {
                byId: { ...actionEntities},
                allIds: Object.keys(actionEntities)
            }
        case types.CREATE_BOOK:
            return {
                byId: { ...state.byId, ...actionEntities},
                allIds: [ ...state.allIds, ...Object.keys(actionEntities)]
            }
        case types.DELETE_BOOK:
        case authorsTypes.DELETE_AUTHOR:
            return{
                byId: _.omit(state.byId, Object.keys(actionEntities)),
                allIds: state.allIds.filter(id => !Object.keys(actionEntities).includes(id))
            }
        case types.UPDATE_BOOK:
        case reviewsTypes.CREATE_REVIEW:
        case reviewsTypes.DELETE_REVIEW:
            return {
                byId: { ...state.byId, ...actionEntities},
                allIds: state.allIds
            }
        case types.GET_BOOKS:
            return{
                byId: { ...state.byId, ...actionEntities},
                allIds: _.uniq([ ...state.allIds, ...Object.keys(actionEntities)])
            }
        default:
            return state;
    }
}