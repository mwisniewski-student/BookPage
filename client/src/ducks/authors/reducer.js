import types from "./types";
import * as _ from 'lodash';

export const authorsReducer = (entity,state,action) => {

    const actionEntities = action.payload[entity];
    const { actionType } = action.meta;

    switch(actionType){
        case types.GET_ALL_AUTHORS:
            return {
                byId: { ...actionEntities},
                allIds: Object.keys(actionEntities)
            }
        case types.CREATE_AUTHOR:
            return {
                byId: { ...state.byId, ...actionEntities},
                allIds: [ ...state.allIds, ...Object.keys(actionEntities)]
            }
        case types.DELETE_AUTHOR:
            return{
                byId: _.omit(state.byId, Object.keys(actionEntities)),
                allIds: state.allIds.filter(id => !Object.keys(actionEntities).includes(id))
            }
        case types.UPDATE_AUTHOR:
            return {
                byId: { ...state.byId, ...actionEntities},
                allIds: state.allIds
            }
        case types.GET_AUTHORS:
            return{
                byId: { ...state.byId, ...actionEntities},
                allIds: _.uniq([ ...state.allIds, ...Object.keys(actionEntities)])
            }
        default:
            return state;
    }
}