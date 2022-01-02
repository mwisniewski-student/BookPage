import { connect } from "react-redux";
import { useHistory } from "react-router";
import AuthorForm from './AuthorForm';
import { updateAuthor } from '../../ducks/authors/operations';
import { getAuthorById } from "../../ducks/authors/selectors"
import { Row, Col } from "react-bootstrap";
import { getAddressById } from "../../ducks/addresses/selectors";
import { useEffect } from "react";
import { getAuthorList } from "../../ducks/authors/operations";
import { getAddressList } from "../../ducks/addresses/operations";

const AuthorEdit = ({ updateAuthor, author, address, getAuthorList, getAddressList, loading, error }) => {
    const history = useHistory()
    useEffect(() => {
        !author && !error && getAuthorList();
        !address && !error && getAddressList();
    }, []);
    const onSubmit = (author) => {
        updateAuthor(author)
        history.push('/authors')
    };
    const mapToInitialValues = (author) => {
        const data = { ...author, birthDate: author.birthDate.split('T')[0] }
        return address ? {
            ...data,
            addressId: { value: address.id, label: address.city }
        } : data
    }
    return (
        <>
            {loading ? <div>loading...</div> :
                author ?
                    <Row>
                        <h1 className="text-center">Edit Author</h1>
                        <Col md={{ span: 6, offset: 3 }} >
                            <AuthorForm initialValues={mapToInitialValues(author)} onSubmit={onSubmit} />
                        </Col>
                    </Row> : <div>No author with given id</div>
            }
        </>
    )
}

const mapStateToProps = (state, props) => {
    const { id } = props.match.params;
    const author = getAuthorById(state, id);
    const address = author ? getAddressById(state, author.addressId) : {}
    return {
        author,
        address,
        loading: state.loading.loading,
        error: state.loading.error
    }
}
const mapDispatchToProps = {
    updateAuthor,
    getAuthorList,
    getAddressList
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorEdit)