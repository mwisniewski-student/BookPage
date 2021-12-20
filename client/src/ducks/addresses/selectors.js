export const getAllAddresses = (state) => {
    return state.entities.addresses.allIds.map(id => state.entities.addresses.byId[id]);
}