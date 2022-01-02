import { Row, Col, Card, ListGroup, Button, Modal } from "react-bootstrap";
import { getBookById } from "../../ducks/books/selectors"
import { getAuthorsByIds } from "../../ducks/authors/selectors";
import { getAuthorList } from "../../ducks/authors/operations";
import { getBookList, deleteBook } from "../../ducks/books/operations"
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const BookDetails = ({ book, authors, loading,
    error, getAuthorList, getBookList, deleteBook }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const handleClose = () => setShowConfirm(false);
    const handleShow = () => setShowConfirm(true);
    const history = useHistory()
    const handleDelete = book => {
        deleteBook(book);
        history.push('/books')
    }

    useEffect(() => {
        !book && !error && getBookList();
        authors.length === 0 && !error && getAuthorList();
    }, []);

    return (
        <>
            {loading ? <div> loading...</div > :
                book ?
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
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
                                    {/* <Link to={`/authors/${author.id}/edit`} className="btn btn-info">EDIT</Link> */}
                                    <Button variant="danger" className="mx-3" onClick={handleShow}>DELETE</Button>
                                    <Modal
                                        show={showConfirm}
                                        onHide={handleClose}
                                        backdrop="static"
                                        keyboard={false}
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title>DELETE</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            Are you sure you want to permanently delete this book?
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <Button variant="danger" onClick={() => handleDelete(book)}>DELETE</Button>
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
                    </Row> : <div>No book with given id</div>
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
        loading: state.loading.loading,
        error: state.loading.error,
        id
    }
}

const mapDispatchToProps = {
    getAuthorList,
    getBookList,
    deleteBook
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetails)