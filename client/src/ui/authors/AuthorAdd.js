import { connect } from "react-redux";
import { useHistory } from "react-router";
import AuthorForm from './AuthorForm';
import { createAuthor } from '../../ducks/authors/operations';
import { Row, Col } from "react-bootstrap";

const AuthorAdd = ({ createAuthor }) => {
    const history = useHistory()
    const initialValues = {
        name: '',
        description: "No description",
        birthDate: new Date().toISOString().split('T')[0],
        image: '',
    }

    const onSubmit = (author) => {
        createAuthor(author)
        history.push('/authors')
    };
    return (
        <Row>
            <h1 className="text-center">Add Author</h1>
            <Col md={{ span: 6, offset: 3 }} >
                <AuthorForm initialValues={initialValues} onSubmit={onSubmit} />
            </Col>
        </Row>
    )
}

const mapDispatchToProps = {
    createAuthor
}

export default connect(undefined, mapDispatchToProps)(AuthorAdd)