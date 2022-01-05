import * as _ from 'lodash';

export const getAllAuthors = state => {
    const result = state.entities.authors.allIds.map(id => state.entities.authors.byId[id])
    return result;
}

export const getAuthorById = (state, id) => {
    return _.values(_.pickBy(state.entities.authors.byId, author => author.id === id))[0]
}

export const getAuthorsByIds = (state, ids) => {
    return _.values(_.pickBy(state.entities.authors.byId, author => ids.includes(author.id)))
}
