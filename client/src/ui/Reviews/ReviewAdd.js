import ReviewForm from "../Reviews/ReviewForm";
import { createReview } from "../../ducks/reviews/operations";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import PropTypes from 'prop-types'

const ReviewAdd = ({ createReview, bookId, showConfirm, handleClose }, { t }) => {
    const initialValues = {
        rating: 0,
        body: ''
    }

    const onSubmit = review => {
        createReview(bookId, review)
    };

    return (
        <>
            <Modal
                show={showConfirm}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t('Leave a Review')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ReviewForm initialValues={initialValues} onSubmit={onSubmit} />
                </Modal.Body>
            </Modal>
        </>
    )
}

ReviewAdd.contextTypes = {
    t: PropTypes.func
}

const mapStateToProps = (_state, props) => {
    return {
        ...props
    }
}

const mapDispatchToProps = {
    createReview
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewAdd)