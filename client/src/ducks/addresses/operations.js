import { createAction } from "redux-api-middleware";
import { schema, normalize } from 'normalizr';
import types from "../entities/types";
import loadingTypes from "../loading/types";

const addressSchema = new schema.Entity('addresses');
const addressesSchema = new schema.Array(addressSchema);

export const getAddressList = () => {
    return createAction({
        endpoint: 'http://localhost:5000/addresses',
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
                    const { entities } = normalize(json, addressesSchema)
                    return entities;
                },
                meta: { actionType: types.GET_ALL }
            },
            loadingTypes.FAILURE
        ]
    })
}

export const getOneAddress = id => {
    return createAction({
        endpoint: `http://localhost:5000/addresses/${id}`,
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
                    const { entities } = normalize(json, addressSchema)
                    return entities;
                },
                meta: { actionType: types.GET_ONE }
            },
            loadingTypes.FAILURE
        ]
    })
}