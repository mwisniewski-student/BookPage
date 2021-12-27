import { useEffect } from "react";
import { connect } from "react-redux";
import { getAllAuthors } from "../../ducks/authors/selectors";
import { getAllBooks } from "../../ducks/books/selectors";
import { getAuthorList } from "../../ducks/authors/operations";
import { Link } from "react-router-dom";
import { Card, Row, Image } from "react-bootstrap";


const AuthorList = ({ loading, error, authors, getAuthorList, books }) => {
    useEffect(() => {
        !(authors.length) && !error && getAuthorList();
    }, []);

    const getNumberOfBooks = authorId => {
        return books.filter(book => book.authorsIds.includes(authorId)).length
    }
    return (
        <div>
            <Link to="/authors/add">Add author</Link>
            <h3>Author list</h3>
            {loading ? <div>loading...</div> :
                authors ? authors.map(author => {
                    return (
                        <Card className="mb-3">
                            <Row>
                                <div className="col-md-4">
                                    <Image src={author.image} alt={author.name + " photo"} thumbnail />
                                </div>
                                <div className="col-md-8">
                                    <Card.Body>
                                        <Card.Title>{author.name}</Card.Title>
                                        <Card.Text>{author.description}</Card.Text>
                                        <Card.Text><small className="text-muted">Number of books: {getNumberOfBooks(author.id)}</small></Card.Text>
                                        <Card.Text><small className="text-muted">Birth Date: {new Date(author.birthDate).toLocaleDateString()}</small></Card.Text>
                                    </Card.Body>
                                </div>
                            </Row>
                        </Card>)
                }) : null
            }
            {error && <div>{error.message}</div>}
        </div >
    )
};
const mapStateToProps = (state) => {
    return {
        authors: getAllAuthors(state),
        books: getAllBooks(state),
        loading: state.loading.loading,
        error: state.loading.error
    };
}
const mapDispatchToProps = {
    getAuthorList
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorList);