import * as _ from 'lodash';

export const getAllBooks = state => {
    return state.entities.books.allIds.map(id => state.entities.books.byId[id]);
}

export const getBooksByAuthor = (state, authorId) => {
    return _.values(_.pickBy(state.entities.books.byId, book => book.authorsIds.includes(authorId)))
}

export const getBookById = (state, id) => {
    return _.values(_.pickBy(state.entities.books.byId, book => book.id === id))[0]
}