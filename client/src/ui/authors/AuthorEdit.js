import { connect } from "react-redux";
import { useHistory } from "react-router";
import AuthorForm from './AuthorForm';
import { updateAuthor } from '../../ducks/authors/operations';
import { getAuthorById } from "../../ducks/authors/selectors"
import { Row, Col } from "react-bootstrap";
import { getAddressById } from "../../ducks/addresses/selectors";
import { useEffect } from "react";
import { getOneAuthor } from "../../ducks/authors/operations";
import { getOneAddress } from "../../ducks/addresses/operations";

const AuthorEdit = ({ updateAuthor, author, address, getOneAuthor, getOneAddress, id }) => {
    const history = useHistory()

    useEffect(() => {
        if (!author) {
            getOneAuthor(id)
        }
        if (!address && author.addressId) {
            getOneAddress(author.addressId)
        }

    }, [author, address]);

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
            {
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
        id
    }
}
const mapDispatchToProps = {
    updateAuthor,
    getOneAuthor,
    getOneAddress
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorEdit)