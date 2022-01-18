import { connect } from "react-redux";
import { useHistory } from "react-router";
import AuthorForm from './AuthorForm';
import { createAuthor } from '../../ducks/authors/operations';
import { Row, Col } from "react-bootstrap";
import PropTypes from 'prop-types'

const AuthorAdd = ({ createAuthor }, { t }) => {
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
            <h1 className="text-center">{t('Add Author')}</h1>
            <Col md={{ span: 6, offset: 3 }} >
                <AuthorForm initialValues={initialValues} onSubmit={onSubmit} />
            </Col>
        </Row>
    )
}

AuthorAdd.contextTypes = {
    t: PropTypes.func
}

const mapDispatchToProps = {
    createAuthor
}

export default connect(undefined, mapDispatchToProps)(AuthorAdd)