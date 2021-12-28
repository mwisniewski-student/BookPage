import { Row, Col, Card, ListGroup } from "react-bootstrap";
import { getAuthorById } from "../../ducks/authors/selectors"
import { getBooksByAuthor } from "../../ducks/books/selectors";
import { getAddressById } from "../../ducks/addresses/selectors";
import { getBookList } from "../../ducks/books/operations";
import { getAuthorList } from "../../ducks/authors/operations"
import { connect } from "react-redux";
import { useEffect } from "react";
import { getAddressList } from "../../ducks/addresses/operations";

const AuthorDetails = ({ author, address, books, loading,
    error, getAddressList, getBookList, getAuthorList }) => {
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
                                {address ? (
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>Birth Date: {new Date(author.birthDate).toLocaleDateString()}</ListGroup.Item>
                                        <ListGroup.Item className="text-muted">Number of Books: {books ? books.length : 0}</ListGroup.Item>
                                    </ListGroup>) : null}
                                { }
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
    getAuthorList
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorDetails)
