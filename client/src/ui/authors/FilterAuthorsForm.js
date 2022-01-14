import { Formik, Form, Field } from "formik";
import { Form as BootstrapForm, Button, Row, Col, ButtonGroup } from "react-bootstrap";

const FilterAuthorsForm = ({ setDisplayedAuthors, allAuthors, setCanvasShow, setSortedOption, paginate }) => {

    const onSubmit = (values) => {
        const authors = [...allAuthors];
        const filteredByNameAuthors = values.name ? authors.filter(author => author.name.toLowerCase().includes(values.name.toLowerCase())) : authors
        const filteredByBookNumberAuthors = filteredByNameAuthors.filter(author => author.numberOfBooks >= values.minBooksNumber && author.numberOfBooks <= values.maxBooksNumber)
        const filteredByBirthAge = values.birthAges.length ? filteredByBookNumberAuthors.filter(author => {
            const birthYear = new Date(author.birthDate).getFullYear();
            return values.birthAges.some(age => {
                return age === "lt19" ? birthYear <= age * 100 : (birthYear > (age - 1) * 100 && birthYear <= age * 100)
            })
        }) : filteredByBookNumberAuthors

        setDisplayedAuthors([...filteredByBirthAge]);
        setCanvasShow(false);
        setSortedOption('Alphabetically');
        paginate(1);
    }

    const handleResetFiltering = () => {
        setDisplayedAuthors([...allAuthors])
        setSortedOption('Alphabetically');
        setCanvasShow(false);
        paginate(1);
    }

    return (
        <div>
            {
                <Formik
                    initialValues={{
                        name: '',
                        minBooksNumber: 0,
                        maxBooksNumber: 9999,
                        birthAges: []
                    }}
                    onSubmit={onSubmit}
                >
                    <Form>
                        <div className="mb-3">
                            <BootstrapForm.Label htmlFor="name"><h3>Name</h3></BootstrapForm.Label>
                            <Field name="name" className="form-control" id="name" />
                        </div>
                        <Row className="mb-3">
                            <BootstrapForm.Group as={Col} md="4">
                                <BootstrapForm.Label htmlFor="minBooksNumber"><h5>Min Books number</h5></BootstrapForm.Label>
                                <Field name="minBooksNumber" type="number" min="0" className="form-control" id="minBooksNumber" />
                            </BootstrapForm.Group>
                            <BootstrapForm.Group as={Col} md="4">
                                <BootstrapForm.Label htmlFor="maxBooksNumber"><h5>Max Books number</h5></BootstrapForm.Label>
                                <Field name="maxBooksNumber" type="number" min="0" className="form-control" id="maxBooksNumber" />
                            </BootstrapForm.Group>
                        </Row>
                        <div className="mb-3">
                            <h3>Ages of Birth</h3>
                            <BootstrapForm.Label className="d-block">
                                <Field className="form-check-input" type="checkbox" name="birthAges" value="lt19" />
                                <span className="ms-2">&lt; XIX</span>
                            </BootstrapForm.Label>
                            <BootstrapForm.Label className="d-block">
                                <Field className="form-check-input" type="checkbox" name="birthAges" value="19" />
                                <span className="ms-2">XIX</span>
                            </BootstrapForm.Label>
                            <BootstrapForm.Label className="d-block">
                                <Field className="form-check-input" type="checkbox" name="birthAges" value="20" />
                                <span className="ms-2">XX</span>
                            </BootstrapForm.Label>
                            <BootstrapForm.Label className="d-block">
                                <Field className="form-check-input" type="checkbox" name="birthAges" value="21" />
                                <span className="ms-2">XXI</span>
                            </BootstrapForm.Label>
                        </div>
                        <ButtonGroup aria-label="Filter buttons" className="mb-3">
                            <Button variant="success" type="submit">Filter</Button>
                            <Button variant="secondary" onClick={handleResetFiltering}>Reset Filtering</Button>
                        </ButtonGroup>
                    </Form>
                </Formik>}
        </div >
    )
}

export default FilterAuthorsForm