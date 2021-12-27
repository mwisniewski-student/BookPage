import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { getAllAddresses } from "../../ducks/addresses/selectors";
import { getAddressList } from "../../ducks/addresses/operations";
import * as Yup from 'yup';
import { useEffect } from "react";

const AuthorForm = ({ initialValues, onSubmit, addresses, getAddressList, loading, error }) => {
    useEffect(() => {
        !(addresses.length) && !error && getAddressList();
    }, []);

    const authorSchema = Yup.object().shape({
        name: Yup.string().required("Author name is required!")
            .max(40, "Author name can contain maximally 40 characters!"),
        birthDate: Yup.date().max(new Date(), "Author must be born now!")
            .required("Birth Date is required!"),
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
                        <label>
                            Name:
                            <Field name="name" />
                            <ErrorMessage name="name" component="div" />
                        </label><br />
                        <label>
                            Birth Date:
                            <Field name="birthDate" type="date" />
                            <ErrorMessage name="birthDate" component="div" />
                        </label><br />
                        <label>
                            Address:
                            <Field name="addressCity" list="addressId" />
                            <Field as="datalist" id="addressId">
                                {addresses.map(address => (
                                    <option value={address.city} />
                                ))}
                            </Field>
                            <ErrorMessage name="addressCity" component="div" />
                        </label><br />
                        <button type="submit">Zatwierdź</button><br />
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