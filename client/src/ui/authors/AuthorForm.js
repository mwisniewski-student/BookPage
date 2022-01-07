import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { getAllAuthors } from "../../ducks/authors/selectors";
import { getAuthorList } from "../../ducks/authors/operations";
import * as Yup from 'yup';
import { useEffect } from "react";
import { Form as BootstrapForm, Button } from "react-bootstrap";
import { default as ReactSelect } from "react-select";
import { setAuthorRequestStatus } from "../../ducks/requestsStatus/actions";

const AuthorForm = ({ initialValues, onSubmit, authors, authorRequestStatus,
    getAuthorList, setAuthorRequestStatus }) => {

    useEffect(() => {
        !authorRequestStatus && getAuthorList() && setAuthorRequestStatus(true);
    }, [authors]);

    const authorSchema = Yup.object().shape({
        name: Yup.mixed().required("Author Name is required!")
            .notOneOf(authors.map(author => author.name).filter(name => name !== initialValues.name), "Author Name must be unique")
            .test('length', "Author name can contain maximally 40 characters!", (value, context) => !value || value.length <= 40),
        birthDate: Yup.date().max(new Date(), "Author must be born now!")
            .required("Birth Date is required!"),
        image: Yup.string().matches(/^https?:\/\/.+\/.+$/, "Image must be url"),
        description: Yup.string(),
    })

    return (
        <div>
            {
                <Formik
                    initialValues={initialValues}
                    enableReinitilise={true}
                    onSubmit={onSubmit}
                    validationSchema={authorSchema}
                >
                    <Form>
                        <div className="mb-3">
                            <BootstrapForm.Label htmlFor="name">Name</BootstrapForm.Label>
                            <Field name="name" className="form-control" id="name" />
                            <ErrorMessage className="text-danger" name="name" component="div" />
                        </div>
                        <div className="mb-3">
                            <BootstrapForm.Label htmlFor="birthDate">Birth Date</BootstrapForm.Label>
                            <Field name="birthDate" type="date" className="form-control" id="birthDate" />
                            <ErrorMessage className="text-danger" name="birthDate" component="div" />
                        </div>
                        <div className="mb-3">
                            <BootstrapForm.Label htmlFor="description">Description</BootstrapForm.Label>
                            <Field as="textarea" name="description" className="form-control" id="description" />
                            <ErrorMessage className="text-danger" name="description" component="div" />
                        </div>
                        <div className="mb-3">
                            <BootstrapForm.Label htmlFor="image">Image</BootstrapForm.Label>
                            <Field name="image" className="form-control" id="image" />
                            <ErrorMessage className="text-danger" name="image" component="div" />
                        </div>
                        <Button variant="success" type="submit">Submit</Button>
                    </Form>
                </Formik>}
        </div>
    )
}


const mapStateToProps = (state, props) => {
    const { initialValues, onSubmit } = props;
    return {
        initialValues,
        onSubmit,
        authors: getAllAuthors(state),
        authorRequestStatus: state.requestsStatus.hasAuthorRequestHappend
    }
}

const mapDispatchToProps = {
    getAuthorList,
    setAuthorRequestStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorForm)