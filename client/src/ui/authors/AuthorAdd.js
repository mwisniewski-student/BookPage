import { connect } from "react-redux";
import { useHistory } from "react-router";
import AuthorForm from './AuthorForm';
import { createAuthor } from '../../ducks/authors/operations';

const AuthorAdd = ({ createAuthor }) => {
    const history = useHistory()
    const initialValues = {
        name: '',
        birthDate: new Date(),
        addressCity: ''
    }

    const onSubmit = (author) => {
        createAuthor(author)
        history.push('/authors')
    };
    return (
        <div>
            <p>Dodaj autora</p>
            <AuthorForm initialValues={initialValues} onSubmit={onSubmit} />
        </div>
    )
}

const mapDispatchToProps = {
    createAuthor
}

export default connect(undefined, mapDispatchToProps)(AuthorAdd)