import { Row, Col, Card, ListGroup, Button, Modal } from "react-bootstrap";
import { getAuthorById } from "../../ducks/authors/selectors"
import { getBooksByAuthor } from "../../ducks/books/selectors";
import { getAddressById } from "../../ducks/addresses/selectors";
import { getBooksByAuthorRequest } from "../../ducks/books/operations";
import { getOneAuthor, deleteAuthor } from "../../ducks/authors/operations"
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { getOneAddress } from "../../ducks/addresses/operations";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const AuthorDetails = ({ author, address, books, id,
    getOneAuthor, getOneAddress, getBooksByAuthorRequest, deleteAuthor }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const handleClose = () => setShowConfirm(false);
    const handleShow = () => setShowConfirm(true);
    const history = useHistory()
    const handleDelete = author => {
        deleteAuthor(author);
        history.push('/authors')
    }
    useEffect(() => {
        !author && getOneAuthor(id);
        !books && getBooksByAuthorRequest(id);
        !address && author && author.addressId && getOneAddress(author.addressId);
    }, [author, address, books]);

    return (
        <>
            {
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
                    </Row> : null
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
        id
    }
}

const mapDispatchToProps = {
    getOneAuthor,
    getOneAddress,
    getBooksByAuthorRequest,
    deleteAuthor
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorDetails)
