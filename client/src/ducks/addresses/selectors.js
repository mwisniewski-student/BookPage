import * as _ from 'lodash';

export const getAllAddresses = (state) => {
    return state.entities.addresses.allIds.map(id => state.entities.addresses.byId[id]);
}

export const getAddressById = (state, id) => {
    return _.values(_.pickBy(state.entities.addresses.byId, address => address.id === id))[0]
}