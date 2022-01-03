import { connect } from "react-redux";
import { useHistory } from "react-router";
import BookForm from './BookForm';
import { updateBook } from '../../ducks/books/operations';
import { getBookById } from "../../ducks/books/selectors"
import { Row, Col } from "react-bootstrap";
import { getAuthorsByIds } from "../../ducks/authors/selectors";
import { useEffect } from "react";
import { getBookList } from "../../ducks/books/operations";
import { getAuthorList } from "../../ducks/authors/operations";

const BookEdit = ({ updateBook, book, authors, getAuthorList, getBookList, loading, error }) => {
    const history = useHistory()
    useEffect(() => {
        !book && !error && getBookList();
        !authors && !error && getAuthorList();
    }, []);

    const onSubmit = book => {
        updateBook(book)
        history.push('/books')
    };

    const mapToInitialValues = book => ({
        ...book,
        publishDate: book.publishDate.split('T')[0],
        categories: book.categories.map(category => ({
            label: category,
            value: category
        })),
        authorsIds: authors.map(author => ({
            label: author.name,
            value: author.id
        }))
    })
    return (
        <>
            {loading ? <div>loading...</div> :
                book ?
                    <Row>
                        <h1 className="text-center">Edit Book</h1>
                        <Col md={{ span: 6, offset: 3 }} >
                            <BookForm initialValues={mapToInitialValues(book)} onSubmit={onSubmit} />
                        </Col>
                    </Row> : <div>No book with given id</div>
            }
        </>
    )
}

const mapStateToProps = (state, props) => {
    const { id } = props.match.params;
    const book = getBookById(state, id);
    const authors = book ? getAuthorsByIds(state, book.authorsIds) : {}
    return {
        book,
        authors,
        loading: state.loading.loading,
        error: state.loading.error
    }
}
const mapDispatchToProps = {
    updateBook,
    getBookList,
    getAuthorList
}

export default connect(mapStateToProps, mapDispatchToProps)(BookEdit)