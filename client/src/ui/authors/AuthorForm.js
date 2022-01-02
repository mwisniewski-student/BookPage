import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { getAllAddresses } from "../../ducks/addresses/selectors";
import { getAddressList } from "../../ducks/addresses/operations";
import * as Yup from 'yup';
import { useEffect } from "react";
import { Form as BootstrapForm, Button } from "react-bootstrap";
import { default as ReactSelect } from "react-select";

const AuthorForm = ({ initialValues, onSubmit, addresses, getAddressList, loading, error }) => {
    useEffect(() => {
        !(addresses.length) && !error && getAddressList();
    }, []);

    const authorSchema = Yup.object().shape({
        name: Yup.string().required("Author name is required!")
            .max(40, "Author name can contain maximally 40 characters!"),
        birthDate: Yup.date().max(new Date(), "Author must be born now!")
            .required("Birth Date is required!"),
        image: Yup.string().matches(/^https?:\/\/.+\/.+$/, "Image must be url"),
        description: Yup.string(),
        addressId: Yup.mixed().nullable()
    })

    const addressOptions = addresses.map(address => ({ label: address.city, value: address.id }))

    const mapSubmitValues = values => {
        const { addressId, ...rest } = values
        return addressId ? {
            ...rest,
            addressId: addressId.value
        } : values
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
                            <BootstrapForm.Label htmlFor="addressId">Address</BootstrapForm.Label>
                            <Field name="addressId" className="form-control" id="addressId">
                                {({ field, form, meta }) => (
                                    <ReactSelect
                                        options={addressOptions}
                                        closeMenuOnSelect={false}
                                        onChange={(value) => form.setFieldValue('addressId', value)}
                                        value={field.value}
                                        isClearable={true}
                                    />
                                )}
                            </Field>
                            <ErrorMessage className="text-danger" name="addressId" component="div" />
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