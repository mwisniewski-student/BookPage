import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Form as BootstrapForm, Button } from "react-bootstrap";

const ReviewForm = ({ initialValues, onSubmit }) => {

    const reviewSchema = Yup.object().shape({
        body: Yup.string(),
        rating: Yup.number().min(1, 'Rating is required!').max(5).required()
    })

    return (
        <div>
            {
                <Formik
                    initialValues={initialValues}
                    enableReinitilise={true}
                    onSubmit={onSubmit}
                    validationSchema={reviewSchema}
                >
                    <Form className="mb-5">
                        <div className="mb-3">
                            <fieldset className="starability-basic">
                                <legend>Rating:</legend>
                                <Field type="radio" id="no-rate" className="input-no-rate" name="rating" value="0" checked aria-label="No rating." />
                                <Field type="radio" id="first-rate1" name="rating" value="1" />
                                <BootstrapForm.Label htmlFor="first-rate1" title="Terrible">1 star</BootstrapForm.Label>
                                <Field type="radio" id="first-rate2" name="rating" value="2" />
                                <BootstrapForm.Label htmlFor="first-rate2" title="Not good">2 stars</BootstrapForm.Label>
                                <Field type="radio" id="first-rate3" name="rating" value="3" />
                                <BootstrapForm.Label htmlFor="first-rate3" title="Average">3 stars</BootstrapForm.Label>
                                <Field type="radio" id="first-rate4" name="rating" value="4" />
                                <BootstrapForm.Label htmlFor="first-rate4" title="Very good">4 stars</BootstrapForm.Label>
                                <Field type="radio" id="first-rate5" name="rating" value="5" />
                                <BootstrapForm.Label htmlFor="first-rate5" title="Amazing">5 stars</BootstrapForm.Label>
                            </fieldset>
                            <ErrorMessage className="text-danger" name="rating" component="div" />
                        </div>
                        <div className="mb-3">
                            <BootstrapForm.Label htmlFor="body">Review</BootstrapForm.Label>
                            <Field name="body" className="form-control" id="body" as="textarea" />
                            <ErrorMessage className="text-danger" name="body" component="div" />
                        </div>
                        <Button variant="success" type="submit">Submit</Button>
                    </Form>
                </Formik>}
        </div>
    )
}

export default ReviewForm