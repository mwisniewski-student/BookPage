import { connect } from "react-redux";
import { useHistory } from "react-router";
import BookForm from './BookForm';
import { updateBook } from '../../ducks/books/operations';
import { getBookById } from "../../ducks/books/selectors"
import { Row, Col } from "react-bootstrap";
import { getAuthorsByIds } from "../../ducks/authors/selectors";
import { useEffect } from "react";
import { getOneBook } from "../../ducks/books/operations";
import { getBooksAuthors } from "../../ducks/books/operations";
import PropTypes from 'prop-types'

const BookEdit = ({ updateBook, book, authors, getOneBook, getBooksAuthors, id }, { t }) => {
    const history = useHistory()

    useEffect(() => {
        !book && getOneBook(id);
        !authors.length && book && getBooksAuthors(id);
    }, [book, authors]);

    const onSubmit = book => {
        updateBook(book)
        history.push('/')
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
            {
                book ?
                    <Row>
                        <h1 className="text-center">{t('Edit Book')}</h1>
                        <Col md={{ span: 6, offset: 3 }} >
                            <BookForm initialValues={mapToInitialValues(book)} onSubmit={onSubmit} />
                        </Col>
                    </Row> : <div>{t('No book with given id')}</div>
            }
        </>
    )
}

BookEdit.contextTypes = {
    t: PropTypes.func
}

const mapStateToProps = (state, props) => {
    const { id } = props.match.params;
    const book = getBookById(state, id);
    const authors = book ? getAuthorsByIds(state, book.authorsIds) : {}
    return {
        book,
        authors,
        id
    }
}
const mapDispatchToProps = {
    updateBook,
    getOneBook,
    getBooksAuthors
}

export default connect(mapStateToProps, mapDispatchToProps)(BookEdit)