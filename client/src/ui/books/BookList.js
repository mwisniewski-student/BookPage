import { useEffect } from "react";
import { connect } from "react-redux";
import { getAllBooks } from "../../ducks/books/selectors";
import { getBookList } from "../../ducks/books/operations";
import { Card, Row, Image } from "react-bootstrap";


const BookList = ({ loading, error, books, getBookList }) => {
    useEffect(() => {
        !(books.length) && !error && getBookList();
    }, []);

    return (
        <div>
            <h3>Book list</h3>
            {loading ? <div>loading...</div> :
                books ? books.map(book => {
                    return (
                        <Card className="mb-3">
                            <Row>
                                <div className="col-md-4">
                                    <Image src={book.image} alt={book.title + " cover"} fluid />
                                </div>
                                <div className="col-md-8">
                                    <Card.Body>
                                        <Card.Title>{book.title}</Card.Title>
                                        <Card.Text>{book.description}</Card.Text>
                                        <Card.Text><small className="text-muted">Pages: {book.numberOfPages}</small></Card.Text>
                                        <Card.Text><small className="text-muted">Published: {new Date(book.publishDate).toLocaleDateString()}</small></Card.Text>
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
        books: getAllBooks(state),
        loading: state.loading.loading,
        error: state.loading.error
    };
}
const mapDispatchToProps = {
    getBookList
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);