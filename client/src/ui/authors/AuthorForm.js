import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { getAllAddresses } from "../../ducks/addresses/selectors";
import { getAddressList } from "../../ducks/addresses/operations";
import * as Yup from 'yup';
import { useEffect } from "react";
import { Form as BootstrapForm, Button } from "react-bootstrap";

const AuthorForm = ({ initialValues, onSubmit, addresses, getAddressList, loading, error }) => {
    useEffect(() => {
        !(addresses.length) && !error && getAddressList();
    }, []);

    const authorSchema = Yup.object().shape({
        name: Yup.string().required("Author name is required!")
            .max(40, "Author name can contain maximally 40 characters!"),
        birthDate: Yup.date().max(new Date(), "Author must be born now!")
            .required("Birth Date is required!"),
        image: Yup.string().url("Image must be url"),
        description: Yup.string(),
        addressCity: Yup.mixed().oneOf(addresses.map(x => x.city), "Address has to be chosen from the list!").required("Address is required!")
    })

    const mapSubmitValues = values => {
        const { addressCity, ...rest } = values
        return {
            ...rest,
            addressId: addresses.find(x => x.city = addressCity).id
        }
    }

    return (
        <div>
            {loading ? <div>loading...</div> :
                <Formik
                    initialValues={initialValues}
                    enableReinitilise={true}
                    onSubmit={(values) => onSubmit(mapSubmitValues(values))}
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
                            <BootstrapForm.Label htmlFor="address">Address</BootstrapForm.Label>
                            <Field name="addressCity" list="addressId" className="form-control" id="address" />
                            <Field as="datalist" id="addressId">
                                {addresses.map(address => (
                                    <option value={address.city} key={address.id} />
                                ))}
                            </Field>
                            <ErrorMessage className="text-danger" name="addressCity" component="div" />
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
                        <Button variant="success" type="submit">Zatwierdź</Button>
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
        addresses: getAllAddresses(state),
        loading: state.loading.loading,
        error: state.loading.error
    }
}

const mapDispatchToProps = {
    getAddressList
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorForm)