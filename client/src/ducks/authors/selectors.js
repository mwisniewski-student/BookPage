export const getAllAuthors = (state) => {
    return state.entities.authors.allIds.map(id => state.entities.authors.byId[id]);
}