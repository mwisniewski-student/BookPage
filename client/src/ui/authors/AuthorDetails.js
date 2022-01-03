import { Row, Col, Card, ListGroup, Button, Modal } from "react-bootstrap";
import { getAuthorById } from "../../ducks/authors/selectors"
import { getBooksByAuthor } from "../../ducks/books/selectors";
import { getAddressById } from "../../ducks/addresses/selectors";
import { getBookList } from "../../ducks/books/operations";
import { getAuthorList, deleteAuthor } from "../../ducks/authors/operations"
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { getAddressList } from "../../ducks/addresses/operations";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const AuthorDetails = ({ author, address, books, loading,
    error, getAddressList, getBookList, getAuthorList, deleteAuthor }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const handleClose = () => setShowConfirm(false);
    const handleShow = () => setShowConfirm(true);
    const history = useHistory()
    const handleDelete = author => {
        deleteAuthor(author);
        history.push('/authors')
    }
    useEffect(() => {
        !author && !error && getAuthorList();
        books.length === 0 && !error && getBookList();
        !address && !error && getAddressList();
    }, []);
    return (
        <>
            {loading ? <div> loading...</div > :
                author ?
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <Card className="mb-3">
                                <Card.Img variant="top" src={author.image} />
                                <Card.Body>
                                    <Card.Title>{author.name}</Card.Title>
                                    <Card.Text>{author.description || 'No description'}</Card.Text>
                                </Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Birth Date: {new Date(author.birthDate).toLocaleDateString()}</ListGroup.Item>
                                    <ListGroup.Item className="text-muted">Number of Books: {books ? books.length : 0}</ListGroup.Item>
                                </ListGroup>
                                <Card.Body>
                                    <Link to={`/authors/${author.id}/edit`} className="btn btn-info">Edit</Link>
                                    <Button variant="danger" className="mx-3" onClick={handleShow}>Delete</Button>
                                    <Modal
                                        show={showConfirm}
                                        onHide={handleClose}
                                        backdrop="static"
                                        keyboard={false}
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title>Delete</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            Are you sure you want to permanently delete this author and all of his books?
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <Button variant="danger" onClick={() => handleDelete(author)}>Delete</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </Card.Body>
                                {books ? <Card.Body>
                                    <Card.Title>Books</Card.Title>
                                    <ListGroup variant="flush">
                                        {books.length !== 0 ? books.map(book => <ListGroup.Item key={book.id}>
                                            <Link to={`/books/${book.id}`}>{book.title}</Link>
                                        </ListGroup.Item>) : <div>No books written</div>}
                                    </ListGroup>
                                </Card.Body> : null}
                            </Card>
                        </Col>
                    </Row> : <div>No author with given id</div>
            }
        </>
    )
}

const mapStateToProps = (state, props) => {
    const { id } = props.match.params;
    const author = getAuthorById(state, id);
    return {
        author,
        books: getBooksByAuthor(state, id),
        address: author ? getAddressById(state, author.addressId) : null,
        loading: state.loading.loading,
        error: state.loading.error,
        id
    }
}

const mapDispatchToProps = {
    getAddressList,
    getBookList,
    getAuthorList,
    deleteAuthor
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorDetails)
