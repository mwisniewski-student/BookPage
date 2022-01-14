import { Formik, Form, Field } from "formik";
import { Form as BootstrapForm, Button, Row, Col, ButtonGroup } from "react-bootstrap";
import { default as ReactSelect } from "react-select";
import categories from "./helpers/categories";
import SelectOption from "../SelectOption";

const FilterBooksForm = ({ setDisplayedBooks, allBooks, setCanvasShow, setSortedOption, paginate }) => {

    const onSubmit = (values) => {
        const books = [...allBooks];
        const filteredByTitle = values.title ? books.filter(book => book.title.toLowerCase().includes(values.title.toLowerCase())) : books
        const filteredByNumberOfPages = filteredByTitle.filter(book => book.numberOfPages >= values.minPagesNumber && book.numberOfPages <= values.maxPagesNumber)
        const categoriesMapped = values.categories.map(x => x.value)
        const filteredByCategory = categoriesMapped.length ? filteredByNumberOfPages.filter(book => {
            return book.categories.some(category => categoriesMapped.includes(category))
        }) : filteredByNumberOfPages
        setDisplayedBooks([...filteredByCategory]);
        setCanvasShow(false);
        setSortedOption('Alphabetically');
        paginate(1);
    }

    const handleResetFiltering = () => {
        setDisplayedBooks([...allBooks])
        setSortedOption('Alphabetically');
        setCanvasShow(false);
        paginate(1);
    }

    const categoriesOptions = categories.map(category => ({ value: category, label: category }))

    return (
        <div>
            {
                <Formik
                    initialValues={{
                        title: '',
                        minPagesNumber: 0,
                        maxPagesNumber: 9999,
                        categories: []
                    }}
                    onSubmit={onSubmit}
                >
                    <Form>
                        <div className="mb-3">
                            <BootstrapForm.Label htmlFor="title"><h3>Title</h3></BootstrapForm.Label>
                            <Field name="title" className="form-control" id="title" />
                        </div>
                        <Row className="mb-3">
                            <BootstrapForm.Group as={Col} md="4">
                                <BootstrapForm.Label htmlFor="minPagesNumber"><h5>Min Pages number</h5></BootstrapForm.Label>
                                <Field name="minPagesNumber" type="number" min="0" className="form-control" id="minPagesNumber" />
                            </BootstrapForm.Group>
                            <BootstrapForm.Group as={Col} md="4">
                                <BootstrapForm.Label htmlFor="maxPagessNumber"><h5>Max Pages number</h5></BootstrapForm.Label>
                                <Field name="maxPagesNumber" type="number" min="0" className="form-control" id="maxPagesNumber" />
                            </BootstrapForm.Group>
                        </Row>
                        <div className="mb-3">
                            <BootstrapForm.Label htmlFor="categories">Categories</BootstrapForm.Label>
                            <Field name="categories" className="form-control" id="categories">
                                {({ field, form, meta }) => (
                                    <ReactSelect
                                        options={categoriesOptions}
                                        isMulti
                                        closeMenuOnSelect={false}
                                        hideSelectedOptions={false}
                                        components={{ Option: SelectOption }}
                                        allowSelectAll={true}
                                        onChange={(values) => form.setFieldValue('categories', values)}
                                        value={field.value}
                                    />
                                )}
                            </Field>
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

export default FilterBooksForm