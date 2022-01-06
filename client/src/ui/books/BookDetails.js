import { Row, Col, Card, ListGroup, Button, Modal } from "react-bootstrap";
import { getBookById } from "../../ducks/books/selectors"
import { getAuthorsByIds } from "../../ducks/authors/selectors";
import { getOneBook, deleteBook, getBooksAuthors } from "../../ducks/books/operations"
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import ReviewAdd from "../Reviews/ReviewAdd";
import { getReviewsFromBook } from "../../ducks/reviews/selectors";
import { deleteReview } from "../../ducks/reviews/operations";

const BookDetails = ({ book, authors, getBooksAuthors, id,
    getOneBook, deleteBook, reviews, deleteReview }) => {
    const [showConfirmDeleteBook, setShowConfirmDeleteBook] = useState(false);
    const handleCloseDeleteBook = () => setShowConfirmDeleteBook(false);
    const handleShowDeleteBook = () => setShowConfirmDeleteBook(true);
    const [showConfirmAddReview, setShowConfirmAddReview] = useState(false);
    const handleCloseAddReview = () => setShowConfirmAddReview(false);
    const handleShowAddReview = () => setShowConfirmAddReview(true);
    const history = useHistory()

    const handleDelete = book => {
        deleteBook(book);
        history.push('/books')
    }

    useEffect(() => {
        if (!book) {
            getOneBook(id)
            if (!authors.length && book) {
                getBooksAuthors(id)
            }
        }
    }, [book, authors]);

    return (
        <>
            {
                book ?
                    <Row>
                        <Col md={{ span: 6 }}>
                            <Card className="mb-3">
                                <Card.Img variant="top" src={book.image} />
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <Card.Text>{book.description || 'No description'}</Card.Text>
                                </Card.Body>
                                <Card.Body>
                                    <Card.Title>Categories</Card.Title>
                                    <ListGroup variant="flush">
                                        {book.categories.map((category, i) => <ListGroup.Item key={i}>{category}</ListGroup.Item>)}
                                    </ListGroup>
                                </Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Publish Date: {new Date(book.publishDate).toLocaleDateString()}</ListGroup.Item>
                                    <ListGroup.Item className="text-muted">Number of Pages: {book.numberOfPages}</ListGroup.Item>
                                </ListGroup>
                                <Card.Body>
                                    <Link to={`/books/${book.id}/edit`} className="btn btn-info">Edit</Link>
                                    <Button variant="danger" className="mx-3" onClick={handleShowDeleteBook}>Delete</Button>
                                    <Modal
                                        show={showConfirmDeleteBook}
                                        onHide={handleCloseDeleteBook}
                                        backdrop="static"
                                        keyboard={false}
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title>Delete</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            Are you sure you want to permanently delete this book?
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleCloseDeleteBook}>
                                                Close
                                            </Button>
                                            <Button variant="danger" onClick={() => handleDelete(book)}>Delete</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </Card.Body>
                                {authors ? <Card.Body>
                                    <Card.Title>{authors.length > 1 ? "Authors" : "Author"}</Card.Title>
                                    <ListGroup variant="flush">
                                        {authors.length !== 0 ? authors.map(author => <ListGroup.Item key={author.id}>
                                            <Link to={`/authors/${author.id}`}>{author.name}</Link>
                                        </ListGroup.Item>) : <div>No Authors</div>}
                                    </ListGroup>
                                </Card.Body> : null}
                            </Card>
                        </Col>
                        <Col md={{ span: 6 }}>
                            <Button variant="success" onClick={handleShowAddReview} className="mb-3">Add Review</Button>
                            <ReviewAdd bookId={id} showConfirm={showConfirmAddReview} handleClose={handleCloseAddReview} />
                            {reviews.map(review => review ? <Card className="mb-3" key={review.id}>
                                <Card.Body>
                                    <Card.Title>Rating: {review.rating}</Card.Title>
                                    <Card.Text>Review: {review.body}</Card.Text>
                                    <Button variant="danger" className="btn-sm" onClick={() => deleteReview(id, review.id)}>Delete</Button>
                                </Card.Body>
                            </Card> : null)}
                        </Col>
                    </Row> : null
            }
        </>
    )
}

const mapStateToProps = (state, props) => {
    const { id } = props.match.params;
    const book = getBookById(state, id);
    return {
        book,
        authors: book ? getAuthorsByIds(state, book.authorsIds) : [],
        reviews: book ? getReviewsFromBook(state, book.id) : [],
        id
    }
}

const mapDispatchToProps = {
    getOneBook,
    getBooksAuthors,
    deleteBook,
    deleteReview
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetails)