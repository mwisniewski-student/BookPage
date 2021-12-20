export const getAllBooks = (state) => {
    return state.entities.books.allIds.map(id => state.entities.books.byId[id]);
}