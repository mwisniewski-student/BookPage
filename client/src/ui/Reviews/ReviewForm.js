import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Form as BootstrapForm, Button } from "react-bootstrap";

const ReviewForm = ({ initialValues, onSubmit }) => {

    const reviewSchema = Yup.object().shape({
        body: Yup.string(),
        rating: Yup.number().min(1).max(5).required()
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
                            <BootstrapForm.Label htmlFor="rating">Rating</BootstrapForm.Label>
                            <Field name="rating" className="form-range" id="rating" type="range" min="1" max="5" />
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