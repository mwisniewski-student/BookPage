import { connect } from "react-redux";
import { useHistory } from "react-router";
import BookForm from './BookForm';
import { createBook } from '../../ducks/books/operations';
import { Row, Col } from "react-bootstrap";

const BookAdd = ({ createBook }) => {
    const history = useHistory()
    const initialValues = {
        title: '',
        description: "No description",
        publishDate: new Date().toISOString().split('T')[0],
        image: '',
        authorsIds: [],
        categories: [],
        numberOfPages: 1
    }

    const onSubmit = book => {
        createBook(book)
        history.push('/books')
    };
    return (
        <Row>
            <h1 className="text-center">Add book</h1>
            <Col md={{ span: 6, offset: 3 }} >
                <BookForm initialValues={initialValues} onSubmit={onSubmit} />
            </Col>
        </Row>
    )
}

const mapDispatchToProps = {
    createBook
}

export default connect(undefined, mapDispatchToProps)(BookAdd)