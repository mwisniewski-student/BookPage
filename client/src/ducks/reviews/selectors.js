export const getReviewsFromBook = (state, bookId) => {
    const book = state.entities.books.byId[bookId];
    const reviewsIds = book ? book.reviews : []
    return reviewsIds.map(id => state.entities.reviews.byId[id])
}